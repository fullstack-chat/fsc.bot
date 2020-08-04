const tableService = require('./azureTableService')

const twentyFourHoursInMs = 86400000
const fiveMinInMs = 300000;
const levelUpConst = 0.4;
const rowKey = 'xpdata'

let data = {}

exports.init = async function () {
  data = await tableService.fetch(rowKey, data);
}

const save = async function () {
  await tableService.save(rowKey, data)
}

exports.getXpForUserId = function(userId) {
  return data[userId].currentXp
}

exports.logXp = async function (message, userId, username) {
  console.log(`Logging message for ${username}`)
  let currentTimestamp = Date.now()
  let user = data[userId]
  let isNew = false;
  if(!user) {
    console.log('User not found, creating new...')
    isNew = true;
    user = {
      lastXpAppliedTimestamp: currentTimestamp,
      currentXp: 0,
      multiplier: 1,
      username: username
    }
  }
  
  // Five min timeout
  if(isNew || (currentTimestamp - user.lastXpAppliedTimestamp) > fiveMinInMs) {
    // If its been longer than 24 hours since we heard from you, reset the multiplier
    if ((currentTimestamp - user.lastXpAppliedTimestamp) > twentyFourHoursInMs) {
      console.log('Multipler getting reset...')
      user.multiplier = 1
    } else if(user.lastXpAppliedTimestamp !== currentTimestamp && user.multiplier < 5) {
      console.log('Bumping multiplier!!!')
      user.multiplier++
    } else {
      console.log('Maxium multiplier detected, go go user!')
    }
    let newXp = user.currentXp + user.multiplier
    console.log(`Adding XP, was ${user.currentXp}, now is ${newXp}`)
    // actually apply the xp
    let levelResults = processXpLevel(user.currentXp, newXp)
    if(levelResults.isLeveledUp) {
      message.channel.send(`🔼 **${username}** is now level **${levelResults.currentLevel}**!`)
    }
    user.currentXp = newXp
    user.lastXpAppliedTimestamp = currentTimestamp
    data[userId] = user
    await save()
  } else {
    console.log("5 min timeout not hit, ignoring...")
  }
}

const processXpLevel = function (previousXp, newXp) {
  let oldLevel = getLevelByXp(previousXp)
  let newLevel = getLevelByXp(newXp)
  let isLeveledUp = false;
  if(newLevel > oldLevel) {
    isLeveledUp = true;
  }
  return {
    isLeveledUp: isLeveledUp,
    currentLevel: newLevel
  }
}

const getLevelByXp = function (xp) {
  return Math.floor(levelUpConst * Math.sqrt(xp))
}