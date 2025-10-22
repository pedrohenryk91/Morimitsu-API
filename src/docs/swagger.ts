import { SwaggerOptions } from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const SwaggerDocumentationOptions:SwaggerOptions = {
    openapi:{
        info:{
            title:"Morimitsu Jiu-Jitsu Tradition System API",
            description:"API for Morimitsu Jiu-Jitsu Tradition System",
            version:"0.0.1",
        },
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
            // "admin/login":{
            //     "post":{
            //         tags:["Admin"],
            //         summary:"Login route for the admin",
            //         description:"Login route. Admin log in.",
            //         requestBody:{
            //             content:{
            //                 "application/json":{
            //                     schema:{
            //                         properties:{
            //                             email:{ description:"The admin's email" },
            //                             password:{ description:"The admin's password" },
            //                         },
            //                         required:["email","password"],
            //                     }
            //                 }
            //             }
            //         },
            //         responses:{
            //             201:{
            //                 description:"Success, returns the token of the logged one.",
            //                 content:{
            //                     "application/json":{
            //                         schema:{
            //                             properties:{
            //                                 "token":{
            //                                     type:"string",
            //                                     description:"The authorization token"
            //                                 },
            //                             }
            //                         }
            //                     }
            //                 }
            //             },
            //             400:{
            //                 description:"The password is incorrect."
            //             },
            //             404:{
            //                 description:"The admin email was not found."
            //             },
            //         }
            //     }
            // },
            // "admin/create":{
            //     "post":{
            //         tags:["Admin"],
            //         summary:"Route to create the admins",
            //         description:"",
            //         requestBody:{
            //             content:{
            //                 "application/json":{
            //                     schema:{
            //                         properties:{
            //                             "email":{
            //                                 description:"The admin email"
            //                             },
            //                             "password":{
            //                                 description:"The password of the admin"
            //                             }
            //                         },
            //                         required:["email","password"]
            //                     }
            //                 }
            //             }
            //         },
            //         responses:{
            //             201:{
            //                 description:"Admin created succesfully",
            //             },
            //             409:{
            //                 description:"Email already in use"
            //             }
            //         }
            //     }
            // },
            "auth/login":{
                post:{
                    tags:["Auth"],
                    summary:"Login to normal user's",
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "email":{
                                            description:"The user email"
                                        },
                                        "password":{
                                            description:"The user password"
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
                        },
                        400:{
                            description:"Incorrect password",
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
            "user/create":{
                post:{
                    tags:["User"],
                    summary:"Route to create an user, only admin can access",
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
            "user/update":{
                post:{
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
            "user/get":{
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
            "class/create":{
                post:{
                    tags:["Class"],
                    summary:"Only admin can acess, create an new class",
                    security:[{"BearerAuth":[]}],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "instructorId":{
                                            description:"The id of the instructor of the class (user entity)"
                                        },
                                        "name":{
                                            description:"Name of the class"
                                        }
                                    },
                                    required:["instructorId","name"]
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
            "class/add/students":{
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
            "class/get/students/:classId":{
                get:{
                    tags:["Class"],
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
            "belt/update":{
                patch:{
                    summary:"Update belt route",
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
            }
        },
    },
}