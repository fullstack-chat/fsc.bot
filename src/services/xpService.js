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

exports.getLevelForUserId = function (userId) {
  let currentXp = data[userId].currentXp
  return getLevelByXp(currentXp)
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

  // Clear penalties
  if(user.penaltyCount && user.penaltyCount > 0) {
    delete user.penaltyCount
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

const processDecrementXpInterval = function() {
  // Get all the users
  let currentTimestamp = Date.now()
  Object.keys(data).forEach(userId => {
    // Check lastXpAppliedTimestamp, if over 3 days, remove 10%
    // const threeDaysInMs = twentyFourHoursInMs * 3
    let daysSinceContact = (currentTimestamp - lastXpAppliedTimestamp) / twentyFourHoursInMs

    // TODO: compare days since contact with penalty count, just subtract 3
    if(daysSinceContact > 3 && (!data[userId].penaltyCount || data[userId].penaltyCount === 0)) {
      data[userId].currentXp = data[userId].currentXp * 0.9
    }

    if(daysSinceContact > 4 && data[userId].penaltyCount === 1) {
      data[userId].currentXp = data[userId].currentXp * 0.9
    }

    if(daysSinceContact > 5 && data[userId].penaltyCount === 2) {
      data[userId].currentXp = data[userId].currentXp * 0.9
    }
    
    if(daysSinceContact > 6 && data[userId].penaltyCount === 3) {
      data[userId].currentXp = data[userId].currentXp * 0.9
    }
    
    if(daysSinceContact > 7 && data[userId].penaltyCount === 4) {
      data[userId].currentXp = data[userId].currentXp * 0.9
    }
    
    if(daysSinceContact > 8 && data[userId].penaltyCount === 5) {
      data[userId].currentXp = data[userId].currentXp * 0.9
    }

    if(daysSinceContact > 9 && data[userId].penaltyCount === 6) {
      data[userId].currentXp = data[userId].currentXp * 0.9
    }

    if(daysSinceContact > 10 && data[userId].penaltyCount === 7) {
      data[userId].currentXp = data[userId].currentXp * 0.9
    }

    if(daysSinceContact > 11 && data[userId].penaltyCount === 8) {
      data[userId].currentXp = data[userId].currentXp * 0.9
    }

    if(daysSinceContact > 12 && data[userId].penaltyCount === 9) {
      data[userId].currentXp = 0
    }
  })
}

const decrementXp = function (userId, daysSinceContact, isBeingReset) {
  // let daysSinceContactInclPenalty = daysSinceContact * 
  if(isBeingReset) {
    console.log(`User ${userId} inactive for ${daysSinceContact}, xp is rest`)
  } else {
    console.log(`User ${userId} inactive for ${daysSinceContact}, xp is now ${data[userId].currentXp * 0.9}`)
  }
  // if(isBeingReset) {
  //   data[userId].currentXp = 0
  // } else {
  //   data[userId].currentXp = data[userId].currentXp * 0.9
  // }
}

  