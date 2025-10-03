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
            "admin/login":{
                "post":{
                    tags:["Admin"],
                    summary:"Login route for the admin",
                    description:"Login route. Admin log in.",
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        email:{ description:"The admin's email" },
                                        password:{ description:"The admin's password" },
                                    },
                                    required:["email","password"],
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Success, returns the token of the logged one.",
                            content:{
                                "application/json":{
                                    schema:{
                                        properties:{
                                            "token":{
                                                type:"string",
                                                description:"The authorization token"
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        400:{
                            description:"The password is incorrect."
                        },
                        404:{
                            description:"The admin email was not found."
                        },
                    }
                }
            },
            "admin/create":{
                "post":{
                    tags:["Admin"],
                    summary:"Route to create the admins",
                    description:"",
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    properties:{
                                        "email":{
                                            description:"The admin email"
                                        },
                                        "password":{
                                            description:"The password of the admin"
                                        }
                                    },
                                    required:["email","password"]
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Admin created succesfully",
                        },
                        409:{
                            description:"Email already in use"
                        }
                    }
                }
            },
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
                        }
                    }
                }
            },
            "user/create":{
                post:{
                    tags:["User"],
                    summary:"Route to create an user",
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
                        409:{
                            description:"Email or Cpf already in use, check error message to know which",
                        }
                    }
                }
            }
        }
    },
    transform: jsonSchemaTransform
}