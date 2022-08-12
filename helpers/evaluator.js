const _ = require("lodash");

const getMembers = (mem) => {
    const member = { ...mem };
    delete member.Members;

    if (!mem.Members || !mem.Members.length) {
        return member;
    }

    return [
        member,
        _.flatMapDeep(mem.Members, getMembers)
    ];
}

const getInvalidMembers = (members) => {
    let invalidMembers = [];
    _.forEach(members, function (member, index) {
        let failureReason = '';
        if (!member.Name) {
            failureReason = 'Name cannot be empty\n';
        }
        if (member.BirthYear > member.DeathYear) {
            failureReason += 'BirthYear cannot be greater than DeathYear';
        }
        if (failureReason) {
            member.error = failureReason;
            member.index = index;
            invalidMembers.push(member);
        }
    });
    return invalidMembers;
}

const removeInvalidMembers = (members, invalidMembers) => {
    _.forEach(invalidMembers, function (member) {
        members.splice(member.index, 1);
    });
}

const calculateAge = (members) => {
    _.forEach(members, function (member) {
        member.Age = member.DeathYear - member.BirthYear;
    });
}

const orderByAge = (members) => {
    members.sort((memberA, memberB) => memberA.Age - memberB.Age);
}

const lineageActivePeriod = (familyMembers) => {
    const oldestMember = _.minBy(familyMembers, (item) => item.BirthYear);
    const youngestMember = _.maxBy(familyMembers, (item) => item.DeathYear);
    return youngestMember.DeathYear - oldestMember.BirthYear;
}

const getMeanAge = (familyMembers) => {
    const meanAge = _.meanBy(familyMembers, function (item) { return item.Age; });
    return meanAge;
}

const getAges = (familyMembers) => {
    return familyMembers.map(item => item.Age);
}

const getMedian = (inputArr) => {
    let mid = Math.floor(inputArr.length / 2);
    if (inputArr.length % 2) {
        return inputArr[mid];
    }

    return (inputArr[mid - 1] + inputArr[mid]) / 2.0;
}

const getMedianAge = (familyMembers) => {
    let ageArr = getAges(familyMembers);
    return getMedian(ageArr);
}

const getIQR = (familyMembers) => {
    const ageArr = getAges(familyMembers);
    let q1 = 0;
    let q3 = 0;
    const mid = Math.floor(ageArr.length / 2);
    q1 = getMedian(ageArr.slice(0, mid));
    if (ageArr.length % 2) {
        q3 = getMedian(ageArr.slice(mid + 1, ageArr.length));
    }
    else {
        q3 = getMedian(ageArr.slice(mid, ageArr.length));
    }

    return q3 - q1;
}

module.exports = {
    getMembers,
    getInvalidMembers,
    removeInvalidMembers,
    calculateAge,
    orderByAge,
    lineageActivePeriod,
    getMeanAge,
    getMedianAge,
    getIQR,
};