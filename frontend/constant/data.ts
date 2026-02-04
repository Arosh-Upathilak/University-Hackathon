import { BsGridFill, BsLightningFill, BsCheckCircleFill } from "react-icons/bs";
import { FaLeaf, FaFire } from "react-icons/fa";
import { CodeSnippetProps } from "./Type";

export const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0"
};

export const CODE_SNIPPETS = {
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
};

export const navBarLink = [
  {
    id: 1,
    name: "Competitions",
    link: "/user",
  },
  {
    id: 2,
    name: "My Compeitions",
    link: "/user/mycompetition",
  },
  {
    id: 3,
    name: "Resource",
    link: "/user/resource",
  },
];

export const difficultyLevel = [
  {
    id: 0,
    label: "All",
    icon: BsGridFill,
    color: "text-blue-500",
  },
  {
    id: 1,
    label: "Easy",
    icon: FaLeaf,
    color: "text-green-500",
  },
  {
    id: 2,
    label: "Medium",
    icon: BsLightningFill,
    color: "text-yellow-500",
  },
  {
    id: 3,
    label: "Hard",
    icon: FaFire,
    color: "text-red-500",
  },
  {
    id: 4,
    label: "Solved",
    icon: BsCheckCircleFill,
    color: "text-blue-600",
  },
];

export const codeSnippets: CodeSnippetProps[] = [
  {
    id: 1,
    language: "python",
    displayName: "Python 3.10",
    codeSnippet: `# Python 3.10
print("Hello, World!")
`,
  },
  {
    id: 2,
    language: "java",
    displayName: "Java 17",
    codeSnippet: `// Java 17
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`,
  },
  {
    id: 3,
    language: "csharp",
    displayName: "C# (.NET 7)",
    codeSnippet: `// C# (.NET 7)
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}
`,
  },
];
