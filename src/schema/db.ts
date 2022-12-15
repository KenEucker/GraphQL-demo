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
        text: "Good for finding out what a dragon really is.",
        author: '0001',
        post: "0100",
    },
    {
        id: "1001",
        text: "I now know what dragons are, thanks!",
        author: '0001',
        post: "0100",
    },
    {
        id: "1002",
        text: "Read this book you know what dragons are and you've decided to feed one.",
        author: '0001',
        post: "0101",
    },
    {
        id: "1003",
        text: "Wait... what did I just read??",
        author: '0001',
        post: "0101",
    },
    {
        id: "1004",
        text: "For when you've given up on your dragon, or are very hungry.",
        author: '0001',
        post: "0102",
    },
    {
        id: "1005",
        text: "Do you ever ask yourself what people are talking about when they say dragons? This book helps demystify the problem.",
        author: '002',
        post: "0103",
    },
    {
        id: "1006",
        text: "Look, everyone knows that dragons are dangerous. This is nothing new.",
        author: '0002',
        post: "0104",
    },
    {
        id: "1007",
        text: "Seroiusly, have you read any of the previous books?",
        author: '0002',
        post: "0105",
    }   
]

export const posts = [
    {
        id: "0100",
        title: "how to find your dragon",
        body: "how to find your dragon",
        author: "0001",
        comments: ["1000", "1001"],
        published: true
    },
    {
        id: "0101",
        title: "how to feed your dragon",
        body: "how to feed your dragon",
        author: "0001",
        comments: ["1002", "1003"],
        published: true
    },
    {
        id: "0102",
        title: "how to slaughter your dragon",
        body: "how to slaughter your dragon",
        author: "0001",
        comments: ["1004"],
        published: true
    },
    {
        id: "0103",
        title: "Are dragons even real?",
        body: "Are dragons even real?",
        author: "0002",
        comments: ["1005"],
        published: true
    },
    {
        id: "0104",
        title: "If you find a dragon, should you feed it?",
        body: "If you find a dragon, should you feed it?",
        author: "0002",
        comments: ["1006"],
        published: true
    },
    {
        id: "0105",
        title: "Why would anyone want to eat dragon meat?",
        body: "Why would anyone want to eat dragon meat?",
        author: "0002",
        comments: ["1006"],
        published: true
    },
]