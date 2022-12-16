export const authors = [
    { 
        id: "0001",
        email: "",
        firstName: "John",
        lastName: "Doe",
        comments: [
            "1000",
            "1001",
            "1002",
            "1003",
            "1004",
        ],
    },
    {
        id: "0002",
        email: "",
        firstName: "Jane",
        lastName: "Doe",
        comments: [
            "1005",
            "1006",
            "1007",
        ],
    }
]

export const comments = [
    {
        id: "1000",
        author: '0001',
        post: "0100",
        text: "Good for finding out what a dragon really is.",
    },
    {
        id: "1001",
        author: '0001',
        post: "0100",
        text: "I now know what dragons are, thanks!",
    },
    {
        id: "1002",
        author: '0001',
        post: "0101",
        text: "Read this book you know what dragons are and you've decided to feed one.",
    },
    {
        id: "1003",
        author: '0001',
        post: "0101",
        text: "Wait... what did I just read??",
    },
    {
        id: "1004",
        author: '0001',
        post: "0102",
        text: "For when you've given up on your dragon, or are very hungry.",
    },
    {
        id: "1005",
        author: '002',
        post: "0103",
        text: "Do you ever ask yourself what people are talking about when they say dragons? This book helps demystify the problem.",
    },
    {
        id: "1006",
        author: '0002',
        post: "0104",
        text: "Look, everyone knows that dragons are dangerous. This is nothing new.",
    },
    {
        id: "1007",
        author: '0002',
        post: "0105",
        text: "Seroiusly, have you read any of the previous books?",
    }   
]

export const posts = [
    {
        id: "0100",
        author: "0001",
        title: "how to find your dragon",
        body: "how to find your dragon",
        comments: ["1000", "1001"],
        published: false
    },
    {
        id: "0101",
        author: "0001",
        title: "how to feed your dragon",
        body: "how to feed your dragon",
        comments: ["1002", "1003"],
        published: true
    },
    {
        id: "0102",
        author: "0001",
        title: "how to slaughter your dragon",
        body: "how to slaughter your dragon",
        comments: ["1004"],
        published: true
    },
    {
        id: "0103",
        author: "0002",
        title: "Are dragons even real?",
        body: "Are dragons even real?",
        comments: ["1005"],
        published: true
    },
    {
        id: "0104",
        author: "0002",
        title: "If you find a dragon, should you feed it?",
        body: "If you find a dragon, should you feed it?",
        comments: ["1006"],
        published: true
    },
    {
        id: "0105",
        author: "0002",
        title: "Why would anyone want to eat dragon meat?",
        body: "Why would anyone want to eat dragon meat?",
        comments: ["1006"],
        published: true
    },
]