export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};


export const studentsDummy = [
  {
    "competitionRegistrationId": 1,
    "studentId": "STU001",
    "studentName": "John Doe",
    "competitionId": 101,
    "registeredAt": "2025-12-20T10:00:00Z"
  },
  {
    "competitionRegistrationId": 2,
    "studentId": "STU001",
    "studentName": "John Doe",
    "competitionId": 102,
    "registeredAt": "2025-12-21T11:00:00Z"
  },

  {
    "competitionRegistrationId": 3,
    "studentId": "STU002",
    "studentName": "Jane Smith",
    "competitionId": 101,
    "registeredAt": "2025-12-20T10:30:00Z"
  },
  {
    "competitionRegistrationId": 4,
    "studentId": "STU002",
    "studentName": "Jane Smith",
    "competitionId": 103,
    "registeredAt": "2025-12-22T09:45:00Z"
  },

  {
    "competitionRegistrationId": 5,
    "studentId": "STU003",
    "studentName": "Alex Johnson",
    "competitionId": 102,
    "registeredAt": "2025-12-21T12:15:00Z"
  },
  {
    "competitionRegistrationId": 6,
    "studentId": "STU003",
    "studentName": "Alex Johnson",
    "competitionId": 104,
    "registeredAt": "2025-12-23T08:30:00Z"
  },

  {
    "competitionRegistrationId": 7,
    "studentId": "STU004",
    "studentName": "Emily Brown",
    "competitionId": 101,
    "registeredAt": "2025-12-20T13:00:00Z"
  },
  {
    "competitionRegistrationId": 8,
    "studentId": "STU004",
    "studentName": "Emily Brown",
    "competitionId": 105,
    "registeredAt": "2025-12-24T14:00:00Z"
  },

  {
    "competitionRegistrationId": 9,
    "studentId": "STU005",
    "studentName": "Michael Lee",
    "competitionId": 103,
    "registeredAt": "2025-12-22T15:20:00Z"
  },
  {
    "competitionRegistrationId": 10,
    "studentId": "STU005",
    "studentName": "Michael Lee",
    "competitionId": 104,
    "registeredAt": "2025-12-23T16:10:00Z"
  },

  {
    "competitionRegistrationId": 11,
    "studentId": "STU006",
    "studentName": "Sophia Wilson",
    "competitionId": 101,
    "registeredAt": "2025-12-20T09:10:00Z"
  },
  {
    "competitionRegistrationId": 12,
    "studentId": "STU006",
    "studentName": "Sophia Wilson",
    "competitionId": 102,
    "registeredAt": "2025-12-21T10:40:00Z"
  },

  {
    "competitionRegistrationId": 13,
    "studentId": "STU007",
    "studentName": "Daniel Martinez",
    "competitionId": 105,
    "registeredAt": "2025-12-24T11:25:00Z"
  },
  {
    "competitionRegistrationId": 14,
    "studentId": "STU007",
    "studentName": "Daniel Martinez",
    "competitionId": 103,
    "registeredAt": "2025-12-22T12:50:00Z"
  },

  {
    "competitionRegistrationId": 15,
    "studentId": "STU008",
    "studentName": "Olivia Taylor",
    "competitionId": 104,
    "registeredAt": "2025-12-23T14:35:00Z"
  },
  {
    "competitionRegistrationId": 16,
    "studentId": "STU008",
    "studentName": "Olivia Taylor",
    "competitionId": 102,
    "registeredAt": "2025-12-21T15:55:00Z"
  },

  {
    "competitionRegistrationId": 17,
    "studentId": "STU009",
    "studentName": "William Anderson",
    "competitionId": 101,
    "registeredAt": "2025-12-20T16:20:00Z"
  },
  {
    "competitionRegistrationId": 18,
    "studentId": "STU009",
    "studentName": "William Anderson",
    "competitionId": 105,
    "registeredAt": "2025-12-24T17:10:00Z"
  },

  {
    "competitionRegistrationId": 19,
    "studentId": "STU010",
    "studentName": "Emma Thomas",
    "competitionId": 103,
    "registeredAt": "2025-12-22T18:00:00Z"
  },
  {
    "competitionRegistrationId": 20,
    "studentId": "STU010",
    "studentName": "Emma Thomas",
    "competitionId": 104,
    "registeredAt": "2025-12-23T19:30:00Z"
  }
]
