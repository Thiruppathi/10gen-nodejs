// 5.1
db.posts.aggregate([
    /* unwind by comments */
    {$unwind:"$comments"},
    /* group by author counting comments */
    {$group: {'_id': "$comments.author", 'count': {$sum: 1} }},
    /* sort by count */
    {$sort: {'count': -1}},
    {$limit : 5},
    {$project : {_id:0, 'author':'$_id', 'count':1}}
]);


// 5.2

db.zips.aggregate([
    {$group: {'_id': {'state':"$state", 'city':"$city"}, pop:{$sum: "$pop"} }},
    {$match: {'_id.state': {$in: ["CA","NY"]},'pop': {$gt : 25000}}},
    {$group: {'_id' : null, "average_pop": {"$avg" : "$pop"} }}
]);


//5.3
db.grades.aggregate([
    {$unwind: '$scores'},
    {$match: {'scores.type': {$in: ["exam","homework"]} }},
    {$group: {'_id': {'class_id':'$class_id', 'student_id':'$student_id'},
              avg_student : {"$avg": "$scores.score"} }},
    {$group: {'_id': '$_id.class_id',
              avg_class : {"$avg": "$avg_student"} }},
    {$sort: {'avg_class': -1} },
    {$project: {_id:0, 'class_id': '$_id', avg_class : 1}},
    {$limit: 1}
]


//5.4
db.zips.aggregate([
    /* Using projection */
    //{$project: {_id:1, first_char: {$substr : ["$city",0,1]}, pop:1 }},
    //{$match: {'first_char': {$in: ['0','1','2','3','4','5','6','7','8','9']} }},
    /* Using regex */
    {$match: {'city': {$regex: '^[0-9]'} }},
    /* Result */
    {$group: {'_id': null, population:{$sum: "$pop"} }},
    {$project: {_id:0, "population": 1}}
]);
