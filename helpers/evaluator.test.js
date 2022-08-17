const evaluator = require('./evaluator');
const _ = require("lodash");

const members = [
    {
        "Name": "First-",
        "BirthYear": "1221",
        "DeathYear": "1264",
        "Members": [
            {
                "Name": "Second-",
                "BirthYear": "1245",
                "DeathYear": "1300"
            }
        ]
    }
];


const flattenedMembersList = [
    {
        "Name": "First-",
        "BirthYear": "1221",
        "DeathYear": "1264"
    },
    {
        "Name": "Second-",
        "BirthYear": "1245",
        "DeathYear": "1300"
    }
];

const flattenedMembersWithAge = [
    {
        "Name": "First-",
        "BirthYear": "1221",
        "DeathYear": "1264",
        "Age": 43
    },
    {
        "Name": "Second-",
        "BirthYear": "1245",
        "DeathYear": "1300",
        "Age": 55
    }
];

const listWithInvalidMembers = [
    {
        "Name": "First-",
        "BirthYear": "1221",
        "DeathYear": "1264"
    },
    {
        "Name": "Second-",
        "BirthYear": "1245",
        "DeathYear": "1234"
    }
];


test('Test the flattening of Members from Family tree', () => {
    expect(_.flatMapDeep(members, evaluator.getMembers)).toEqual(flattenedMembersList);
});

test('Test to get the invalid Members from Family tree', () => {
    expect(evaluator.getInvalidMembers(listWithInvalidMembers)).toEqual([{
        "Name": "Second-",
        "BirthYear": "1245",
        "DeathYear": "1234",
        "error": "BirthYear cannot be greater than DeathYear",
        "index": 1
    }]);
});

test('Test to remove invalid Members from Family tree', () => {
    
    const invalidMem = evaluator.getInvalidMembers(listWithInvalidMembers);
    evaluator.removeInvalidMembers(listWithInvalidMembers, invalidMem);

    expect(listWithInvalidMembers).toEqual([{
        "Name": "First-",
        "BirthYear": "1221",
        "DeathYear": "1264"
    }]);
});

test('Test to calculate Age of Members in Family tree', () => {
    evaluator.calculateAge(flattenedMembersList);
    expect(flattenedMembersList).toEqual(flattenedMembersWithAge);
});

test('Test to age order', () => {
    evaluator.orderByAge(flattenedMembersList);
    const ageMap = flattenedMembersList.map(item => item.Age);
    expect(ageMap).toEqual([43, 55]);
});


test('Test to lineage active period', () => {
    expect(evaluator.lineageActivePeriod(flattenedMembersList)).toBe(79);
});


test('Test to get the mean of the Members', () => {
    expect(evaluator.getMeanAge(flattenedMembersList)).toBe(49);
});

test('Test to get the median age of the Members', () => {
    expect(evaluator.getMedianAge(flattenedMembersList)).toBe(49);
});

