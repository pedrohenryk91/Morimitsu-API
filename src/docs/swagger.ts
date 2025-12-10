import { SwaggerOptions } from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

const classObject: any = {
    "id":{
        description:"The id of the class"
    },
    "instructorId":{
        description:"The id of the instructor of the class (user entity)"
    },
    "requiredFq":{
        description:"The required frequency of the class",
        type:"number"
    },
    "name":{
        description:"Name of the class"
    },
    "type":{
        description:"The class type",
        enum:[
            "kids",
            "normal",
            "mista",
        ],
        examples:["kids","normal","mista"]
    },
}

const studentObject: any = {
    cpf:{
        description:"Student cpf",
    },
    gender:{
        enum:[
            "man",
            "woman"
        ],
        example:"man | woman",
        
    },
    birthday:{
        type:"string",
        format:"date-time",
        description:"Student birthday"
    },
    nickname:{
        description:"Student nickname"
    },
    currentFq:{
        type:"number",
        description:"The initial number of the student frequency"
    },
    fullname:{
        description:"student full name"
    },
    guardianName:{
        description:"Full name of the legal guardian of the student"
    },
    phoneNumber:{
        description:"Phone number of the student"
    },
    guardianNumber:{
        description:"Phone number of the legal guardian"
    },
    beltId:{
        description:"Id of the student belt"
    }
}

const eligibleStudentObject: any = {
    "id":{
        description:""
    },
    "full_name":{
        description:""
    },
    "current_fq":{
        description:""
    },
    "belt_color":{
        description:""
    },
    "belt_rq_fq":{
        type:"number",
        description:"The required frequency of the belt to graduate",
    },
    "class_id":{
        nullable:true,
    },
    "class_name":{
        nullable:true
    },
    "class_type":{
        nullable:true,
        enum:[
            "kids",
            "normal",
            "mista"
        ],
    },
    "class_rq_fq":{
        nullable:true,
        type:"number",
        description:"The required frequency of the class to graduate"
    }
}

const reportObject: any = {
    "result":{
        type:"array",
        items:{
            properties:{
                "id":{
                    description:"Id of the report"
                },
                "to":{
                    enum:[
                        "instructor",
                        "admin",
                    ],
                    description:"If the id is for instructors or admins"
                },
                "text":{
                    description:"The text of the report, this can be null",
                },
                "title":{
                    description:"The title of the report"
                },
                "date":{
                    type:"string",
                    format:"date-time",
                    description:"The date of creation of the report",
                }
            }
        }
    }
}

export const SwaggerDocumentationOptions:SwaggerOptions = {
    openapi:{
        info:{
            title:"Morimitsu Jiu-Jitsu Tradition System API",
            description:"API for Morimitsu Jiu-Jitsu Tradition System",
            version:"0.0.1",
        },
        servers:[{
            url:"https://morimitsu-api.onrender.com/"
        },{
            url:"http://localhost:4786/"
        }],
        components:{
            securitySchemes:{
                "BearerAuth":{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat:"JWT"
                },
            }
        },
        paths:{
            "/auth/login":{
                post:{
                    tags:["Auth"],
                    summary:"Login",
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "email":{
                                            description:"The user email"
                                        },
                                        "password":{
                                            description:"The user password",
                                            example:"abcdef"
                                        }
                                    },
                                    required:["email","password"]
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"User logged successfully",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            "token":{
                                                description:"The auth token"
                                            },
                                            "role":{
                                                description:"The role of the user",
                                                enum:["admin","instructor"],
                                                examples:["admin","instructor"]
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400:{
                            description:"Incorrect password",
                        },
                        404:{
                            description:"User was not found"
                        },
                        422:{
                            description:"ZodError, invalid parameters were passed"
                        },
                        500:{
                            description:"Unknown error"
                        }
                    }
                }
            },
            "/auth/requestRecovery":{
                post:{
                    tags:["Auth"],
                    summary:"Request a Password Recovery",
                    description:"Route to request a password recovery (sends an email)",
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "email":{
                                            description:"The email that the recovery email will be sent to."
                                        },
                                    },
                                    required:["email"],
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Recovery email sent to the user."
                        },
                        404:{
                            description:"Email was not found;"
                        },
                        500:{
                            description:"Internal Server Error."
                        }
                    }
                }
            },
            "/auth/recoverPassword":{
                put:{
                    tags:["Auth"],
                    summary:"Recover user's password",
                    security:[{"BearerAuth":[]}],
                    description:"Recover the user password by changing it. Requires an special token that it's sent by the '/auth/requestRecovery' route.'",
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "email":{
                                            description:"The user's email"
                                        },
                                        "newPassword":{
                                            description:"User's new password"
                                        }
                                    },
                                    required:["email","newPassword"],
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Password Changed.",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            "token":{
                                                description:"The auth token"
                                            },
                                            "role":{
                                                description:"The role of the user",
                                                enum:["admin","instructor"],
                                                examples:["admin","instructor"]
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        403:{
                            description:"Special auth token was not provided."
                        },
                        404:{
                            description:"User was not found"
                        },
                        422:{
                            description:"ZodError, invalid parameters were passed"
                        },
                        500:{
                            description:"Unknown error"
                        }
                    }
                }
            },
            "/user/create":{
                post:{
                    tags:["User"],
                    summary:"Route to create an user (ADMIN ONLY)",
                    security:[{"BearerAuth":[]}],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "cpf":{
                                            description:"User CPF"
                                        },
                                        "email":{
                                            description:"User Email"
                                        },
                                        "password":{
                                            description:"User password"
                                        },
                                        "name":{
                                            description:"The name of the user"
                                        },
                                        "belt_id":{
                                            description:"O id da faixa do usuario",
                                            type:"integer",
                                        },
                                        "phoneNumber":{
                                            description:"The user phone number, this is optional"
                                        },
                                    },
                                    required:["cpf","email","password","name"]
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"User created"
                        },
                        403:{
                            description:"User did not have permission to access the route due to not being an admin."
                        },
                        409:{
                            description:"Email or Cpf already in use, check error message to know which",
                        },
                        500:{
                            description:"Unknown error"
                        }
                    }
                }
            },
            "/user/createFromStudent":{
                post:{
                    tags:["User"],
                    summary:"Route to create an user from a student (ADMIN ONLY)",
                    security:[{"BearerAuth":[]}],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "studentId":{
                                            description:"Id of the student"
                                        },
                                        "email":{
                                            description:"User Email"
                                        },
                                        "password":{
                                            description:"User password"
                                        },
                                    },
                                    required:["studentId","email","password",]
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"User created"
                        },
                        403:{
                            description:"User did not have permission to access the route due to not being an admin."
                        },
                        409:{
                            description:"Email or Cpf already in use, check error message to know which",
                        },
                        500:{
                            description:"Unknown error"
                        }
                    }
                }
            },
            "/user/update":{
                put:{
                    tags:["User"],
                    summary:"Update user",
                    security:[{"BearerAuth":[]}],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "name":{
                                            description:""
                                        },
                                        "email":{
                                            description:""
                                        },
                                        "password":{
                                            description:""
                                        },
                                        "cpf":{
                                            description:""
                                        },
                                        "phoneNumber":{
                                            description:""
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"User updated.",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            "name":{
                                                description:"If the user updated their name, this is the updated name of the user"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        404:{
                            description:"User not found"
                        },
                        409:{
                            description:"Email or Cpf is already in use. Check route for detail."
                        },
                        500:{
                            description:"Unknown error"
                        }
                    }
                }
            },
            "/user/get":{
                get:{
                    tags:["User"],
                    summary:"Get the user info",
                    security:[{"BearerAuth":[]}],
                    responses:{
                        200:{
                            description:"Success",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            "cpf":{

                                            },
                                            "name":{

                                            },
                                            "phoneNumber":{

                                            }
                                        }
                                    }
                                }
                            }
                        },
                        404:{
                            description:"User not found"
                        },
                        500:{
                            description:"Unknown error"
                        }
                    }
                }
            },
            "/user/delete/:id":{
                delete:{
                    tags:["User"],
                    summary:"Delete a user (ADMIN ONLY)",
                    security:[{"BearerAuth":[]}],
                    parameters:[
                        {
                            name:"id",
                            in:"path",
                            schema:{
                                type:"string"
                            }
                        }
                    ],
                    responses:{
                        200:{
                            description:"deleted"
                        },
                        404:{
                            description:"User not found"
                        },
                        500:{
                            description:"Unpredicted error"
                        }
                    }
                }
            },
            "/class/create":{
                post:{
                    tags:["Class"],
                    summary:"Create an new class (ADMIN ONLY)",
                    security:[{"BearerAuth":[]}],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "instructorId":{
                                            description:"The id of the instructor of the class (user entity)"
                                        },
                                        "requiredFq":{
                                            description:"The required frequency of the class",
                                            type:"number"
                                        },
                                        "name":{
                                            description:"Name of the class"
                                        },
                                        "type":{
                                            description:"The class type",
                                            enum:[
                                                "kids",
                                                "normal",
                                                "mista",
                                            ],
                                            examples:["kids","normal","mista"]
                                        },
                                    },
                                    required:["instructorId","name","type"]
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Class created"
                        },
                        403:{
                            description:"User did not have permission to access the route due to not being an admin."
                        },
                        404:{
                            description:"User was not found."
                        },
                        500:{
                            description:"Unknown error"
                        }
                    }
                }
            },
            "/class/add/students":{
                put:{
                    tags:["Class"],
                    summary:"Add students to a class",
                    security:[{"BearerAuth":[]}],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "studentsIds":{
                                            type:"array",
                                            items:{
                                                type:"string"
                                            },
                                            description:"An array with the ids of the students"
                                        },
                                        "classId":{
                                            description:"The id of the class where the students are goung to be added"
                                        }
                                    },
                                    required:["studentsIds","classId"],
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Students added"
                        },
                        404:{
                            description:"User was not found"
                        },
                        500:{
                            description:"Unknown error"
                        }
                    }
                }
            },
            "/class/get/students/:classId":{
                get:{
                    tags:["Class"],
                    summary:"Get the students from a specific class",
                    security:[{"BearerAuth":[]}],
                    responses:{
                        200:{
                            description:"Success",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            "result":{
                                                type:"array",
                                                items:{
                                                    properties:{
                                                        "id":{
                                                            description:"Student id"
                                                        },
                                                        "cpf":{
                                                            description:""
                                                        },
                                                        "gender":{
                                                            description:""
                                                        },
                                                        "birthday":{
                                                            type:"string",
                                                            format:"date-time",
                                                            description:"Student birthday date"
                                                        },
                                                        "nickname":{
                                                            description:""
                                                        },
                                                        "full_name":{
                                                            description:""
                                                        },
                                                        "current_fq":{
                                                            description:""
                                                        },
                                                        "phone_number":{
                                                            description:""
                                                        },
                                                        "guardian_name":{
                                                            description:""
                                                        },
                                                        "guardian_phone":{
                                                            description:""
                                                        },
                                                        "belt_id":{
                                                            description:""
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        404:{
                            description:"Class was not found"
                        }
                    }
                }
            },
            "/class/search?":{
                get:{
                    tags:["Class"],
                    parameters:[
                        {
                            name:"name",
                            in:"query",
                            description:"The name of the class",
                        },
                        {
                            name:"type",
                            in:"query",
                            schema:{
                                enum:[
                                    "kids",
                                    "normal",
                                    "mista",
                                ]
                            },
                            description:"The type of the class"
                        }
                    ],
                    summary:"Search for classes, params in query",
                    security:[{"BearerAuth":[]}],
                    description:"Search for classes",
                    responses:{
                        200:{
                            description:"success",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            "result":{
                                                type:"array",
                                                items:{
                                                    properties:classObject,
                                                }
                                            }
                                        },
                                    }
                                }
                            }
                        },
                        500:{
                            description:"Erro não previsto"
                        }
                    }
                }
            },
            "/class/update":{
                put:{
                    tags:["Class"],
                    summary:"Update class route (ADMIN ONLY)",
                    security:[{"BearerAuth":[]}],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "classId":{
                                            description:"Id of the class"
                                        },
                                        "name":{
                                            description:"Fill this with the new name of the class"
                                        },
                                        "instructorId":{
                                            description:"Fill this with the new instructor id"
                                        },
                                        "requiredFq":{
                                            description:"Change the required frequency that the class has"
                                        }
                                    },
                                    required:["classId"]
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"success"
                        },
                        404:{
                            description:"Class not found"
                        },
                        500:{
                            description:"Erro não previsto"
                        }
                    }
                }
            },
            "/belt/update":{
                patch:{
                    tags:["Belt"],
                    summary:"Update belt route (ADMIN ONLY)",
                    description:"Entenda que cada combinação de cor-grau de faixa é uma linha especifica no banco de dados, logo só quem pode edita-las deverá ser o usuário. Ele só pode alterar o 'rq_frequency', isso é, a quantidade de presenças que um aluno tem que ter naquela faixa pra passar pra próxima faixa.'color' é a cor das faixas que serão alteradas.",
                    security:[{"BearerAuth":[]}],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "color":{
                                            description:"Isso aqui é pra IDENTIFICAR as faixas."
                                        },
                                        "rq_frequency":{
                                            description:"De fato o que será mudado, leia a descrição para mais detalhes."
                                        },
                                    }
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"updated successfully"
                        },
                        404:{
                            description:"User not found",
                        },
                        500:{
                            description:"Unknown error"
                        }
                    }
                }
            },
            "/frequency/add":{
                put:{
                    tags:["Frequency"],
                    summary:"Route to add many frequencies",
                    security:[{"BearerAuth":[]}],
                    description:"For efficiency, this route is designed to receive many students ids and add the frequency of them all in a same class.",
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "studentsIds":{
                                            type:"array",
                                            items:{
                                                type:"string",
                                            },
                                            description:"The many ids of the students"
                                        },
                                        "classId":{
                                            description:"The id of the class"
                                        },
                                        "date":{
                                            type:"string",
                                            format:"date-time"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Success"
                        },
                        404:{
                            description:"Student id or class wer not found. Check out the error message to know which"
                        },
                        500:{
                            description:"Unknown error"
                        }
                    }
                }
            },
            "/student/create":{
                post:{
                    tags:["Student"],
                    summary:"Route to create an student",
                    security:[{"BearerAuth":[]}],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:studentObject,
                                    required:["cpf","age","gender","nickname","currentFq","fullName","guardianName","birthday","beltId"]
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Student created",
                        },
                        409:{
                            description:"Cpf already registered",
                        },
                        500:{
                            description:"Internal server error"
                        }
                    }
                }
            },
            "/student/search?":{
                get:{
                    tags:["Student"],
                    summary:"Route to search students by name",
                    security:[{"BearerAuth":[]}],
                    parameters:[
                       {
                            in:"query",
                            name:"fullName",
                            description:"Full name",
                            schema:{
                                type:"string",
                            }
                       },
                       {
                            in:"query",
                            name:"nickname",
                            description:"Nickname",
                            schema:{
                                type:"string",
                            }
                       },
                       {
                            in:"query",
                            name:"minAge",
                            description:"Min age for age range search",
                            schema:{
                                type:"number"
                            }
                       },
                       {
                            in:"query",
                            name:"maxAge",
                            description:"Max age for age range",
                            schema:{
                                type:"number"
                            }
                       }
                    ],
                    responses:{
                        200:{
                            description:"Success",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            students:{
                                                type:"array",
                                                items:{
                                                    properties:studentObject,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/student/search/gradable":{
                get:{
                    tags:["Student"],
                    summary:"Search for the gradale students based on their frequency",
                    security:[{"BearerAuth":[]}],
                    responses:{
                        200:{
                            description:"Everything went okay",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            "result":{
                                                type:"array",
                                                items:{
                                                    properties:eligibleStudentObject,
                                                }
                                            }
                                        },
                                    }
                                }
                            }
                        },
                        500:{
                            description:"Unpredicted error"
                        }
                    }
                }
            },
            "/student/search/birthday":{
                get:{
                    tags:["Student"],
                    summary:"Search for students that had their birthdays on the last 30 days",
                    security:[{"BearerAuth":[]}],
                    description:"Search for students that had their birthdays on the last 30 days",
                    responses:{
                        200:{
                            description:"success or none were found",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            "result":{
                                                type:"array",
                                                items:{
                                                    properties:{
                                                        "full_name":{
                                                            description:"The student full name"
                                                        },
                                                        "cpf":{
                                                            description:"The student cpf"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        404:{
                            description:"User was not found"
                        },
                        500:{
                            description:"Unpredicted error"
                        }
                    }
                }
            },
            "/student/get/:studentName":{
                get:{
                    tags:["Student"],
                    summary:"Get an student by it's name",
                    security:[{"BearerAuth":[]}],
                    parameters:[
                        {
                            name:"studentName",
                            in:"path",
                            schema:{
                                type:"string",
                            }
                        }
                    ],
                    responses:{
                        200:{
                            description:"Success",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            "response":{
                                                type:"array",
                                                items:{
                                                    properties:studentObject,
                                                }
                                            }
                                        },
                                    }
                                }
                            }
                        },
                        409:{
                            description:"Student not found error"
                        },
                        500:{
                            description:"Unpredicted error"
                        }
                    }
                }
            },
            "/student/update/:studentId":{
                put:{
                    tags:["Student"],
                    summary:"Get an student by it's name",
                    security:[{"studentId":[]}],
                    parameters:[
                        {
                            name:"studentName",
                            in:"path",
                            schema:{
                                type:"string",
                            }
                        }
                    ],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:studentObject,
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Student updated.",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:studentObject,
                                    }
                                }
                            }
                        },
                        404:{
                            description:"Student not found."
                        },
                        409:{
                            description:"Cpf already in use."
                        }
                    }
                }
            },
            "/student/delete/:id":{
                delete:{
                    tags:["Student"],
                    summary:"Delete an student",
                    security:[{"BearerAuth":[]}],
                    parameters:[
                        {
                            name:"id",
                            in:"path",
                            schema:{
                                type:"string"
                            },
                        }
                    ],
                    responses:{
                        200:{
                            description:"deleted",
                        },
                        404:{
                            description:"student not found",
                        },
                        500:{
                            description:"Unpredicted error"
                        }
                    }
                }
            },
            "/report/search?":{
                get:{
                    tags:["Report"],
                    summary:"Search for reports route",
                    security:[{"BearerAuth":[]}],
                    parameters:[
                        {
                            in:"query",
                            name:"id",
                            schema:{
                                type:"string",
                                description:"Id of the report",
                                examples:[
                                    ".anniversary.YYYY-MM-DD.UUUU-UUUU-UUUU-UUUUUUUU",
                                    ".age.gradable.UUUU-UUUU-UUUU-UUUUUUUU",
                                    ".blablabla"
                                ]
                            },
                            description:"Id of the report"
                        },
                        {
                            in:"query",
                            name:"text",
                            schema:{
                                type:"string",
                                description:"Text of the report",
                                examples:[
                                    "Aniversário de alunos blablabla",
                                    "blablabla"
                                ]
                            },
                            description:"Text of the report",
                        },
                        {
                            in:"query",
                            name:"title",
                            schema:{
                                type:"string",
                                description:"Title of the report",
                                examples:[
                                    "Blablablabla",
                                    "Lorem ipsum dolor amet"
                                ],
                            },
                            description:"Title of the report",
                        },
                        {
                            in:"query",
                            name:"maxDate",
                            schema:{
                                type:"string",
                                format:"date-time",
                                description:"Search for reports up to this date",
                            },
                            description:"Search for reports up to this date",
                        },
                        {
                            in:"query",
                            name:"minDate",
                            schema:{
                                type:"string",
                                format:"date-time",
                                description:"Search for reports after this date"
                            },
                            description:"Search for reports after this date"
                        }
                    ],
                    responses:{
                        200:{
                            description:"Success or none were found",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:reportObject,
                                    }
                                }
                            }
                        },
                        404:{
                            description:"User was not found"
                        },
                        500:{
                            description:"Unpredicted error"
                        }
                    }
                }
            },
            "/report/birthday":{
                get:{
                    tags:["Report"],
                    summary:"Search for reports of birthday",
                    security:[{"BearerAuth":[]}],
                    responses:{
                        200:{
                            description:"Success or none were found",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:reportObject,
                                    }
                                }
                            }
                        },
                        404:{
                            description:"User was not found"
                        },
                        500:{
                            description:"Unpredicted error"
                        }
                    }
                }
            }
        },
    },
    hideUntagged: true,
    exposeHeadRoutes: false
}