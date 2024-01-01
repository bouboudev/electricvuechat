<template>
    <div id="app">
        <router-view />
    </div>
</template>


<style>
* {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

@media screen and (min-width: 402px) {
    body {
        width: 375px;
        height: 812px;
        margin-left: auto;
        margin-right: auto;
    }
}


:root {
    --couleur-principale: #fbc531;
    --couleur-secondaire: #242424;

}

.view {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--couleur-secondaire);

    &.login {
        align-items: center;

        .login-form {
            display: block;
            width: 100%;
            padding: 15px;

            .form-inner {
                display: block;
                background-color: #fff;
                padding: 50px 15px;
                border-radius: 16px;
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

                h1 {
                    color: #aaa;
                    font-size: 28px;
                    margin-bottom: 30px;
                }

                label {
                    display: block;
                    margin-bottom: 5px;
                    color: #aaa;
                    font-size: 16px;
                    transition: 0.4s;
                }

                input[type="email"] {
                    appearance: none;
                    border: none;
                    outline: none;
                    background: none;
                    display: block;
                    width: 100%;
                    padding: 10px 15px;
                    border-radius: 8px;
                    margin-bottom: 15px;

                    color: #333;
                    font-size: 18px;
                    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
                    background-color: #f3f3f3;
                    transition: 0.4s;

                    &::placeholder {
                        color: #888;
                        transition: 0.4s;
                    }
                }

                input[type="text"] {
                    appearance: none;
                    border: none;
                    outline: none;
                    background: none;
                    display: block;
                    width: 100%;
                    padding: 10px 15px;
                    border-radius: 8px;
                    margin-bottom: 15px;

                    color: #333;
                    font-size: 18px;
                    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
                    background-color: #f3f3f3;
                    transition: 0.4s;

                    &::placeholder {
                        color: #888;
                        transition: 0.4s;
                    }
                }

                input[type="password"] {
                    appearance: none;
                    border: none;
                    outline: none;
                    background: none;
                    display: block;
                    width: 100%;
                    padding: 10px 15px;
                    border-radius: 8px;
                    margin-bottom: 15px;

                    color: #333;
                    font-size: 18px;
                    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
                    background-color: #f3f3f3;
                    transition: 0.4s;

                    &::placeholder {
                        color: #888;
                        transition: 0.4s;
                    }
                }

                input[type="submit"] {
                    appearance: none;
                    border: none;
                    outline: none;
                    background: none;
                    display: block;
                    width: 100%;
                    padding: 10px 15px;
                    background-color: var(--couleur-principale);
                    border-radius: 8px;
                    color: #fff;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;

                }

                p {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    margin: 10px 0px;
                    font-weight: 600;
                    a {
                        color: var(--couleur-principale);
                        margin-left: 5px;
                    }
                }

                &:focus-within {
                    label {
                        color: var(--couleur-principale);
                    }

                    input[type="text"] {
                        background-color: #fff;
                        box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);

                        &::placeholder {
                            color: #666;
                        }
                    }

                    p {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-decoration: none;
                        margin: 10px 0px;

                        a {
                            color: var(--couleur-principale);
                            margin-left: 5px;
                        }
                    }
                }
            }
        }
    }

    &.chat {
        flex-direction: column;

        header {
            position: relative;
            display: block;
            width: 100%;
            padding: 50px 30px 10px;

            .title {
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                margin: 10px 0px;
                color: #fff;
                font-size: 48px;
                margin-bottom: 30px;
            }
            .logout {
                position: absolute;
                top: 15px;
                right: 15px;
                appearance: none;
                border: none;
                outline: none;
                background: none;
                cursor: pointer;
                color: #fff;
                font-size: 18px;
                margin-bottom: 10px;
                text-align: right;
                padding: 10px 15px;
                border-radius: 8px;
                font-weight: 600;
            }
            .logout:hover {
                color: var(--couleur-principale);
                background-color: #1f1f1f;
                border-radius: 8px;
                transition: 0.3s;
            }
            h1 {
                color: var(--couleur-principale);
            }
        }

        .chat-box {
            border-radius: 24px 24px 0px 0px;
            background-color: #fff;
            box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
            flex: 1 1 100%;
            padding: 30px;

            .message {
                display: flex;
                margin-bottom: 15px;

                .message-inner {
                    display: flex;
                    flex-direction: column;

                    .username {
                        color: #888;
                        font-size: 16px;
                        margin-bottom: 5px;
                        padding-left: 15px;
                        padding-right: 15px;
                    }

                    .message-content {
                        display: flex;
                        align-items: center;
                    }

                    .edit{
                        text-decoration: none;
                        color: var(--couleur-principale);
                        font-size: 8px;
                        border-radius: 8px;
                        cursor: pointer;
                        padding: 5px 5px;
                    }

                    .delete {
                        text-decoration: none;
                        color: var(--couleur-principale);
                        font-size: 8px;
                        border-radius: 8px;
                        cursor: pointer;
                        padding: 5px 5px;
                    }



                    .current-user & {
                        .delete {
                            align-self: flex-end;
                        }
                        .edit {
                            align-self: flex-end;
                        }
                    }

                    .content {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #f3f3f3;
                        border-radius: 999px;
                        color: #333;
                        font-size: 18px;
                        line-height: 1.2em;
                        text-align: left;
                    }
                }

                &.current-user {
                    margin-top: 30px;
                    justify-content: flex-end;
                    text-align: right;

                    .message-inner {
                        max-width: 75%;

                        .content {
                            color: #fff;
                            font-weight: 600;
                            background-color: var(--couleur-principale);
                        }
                    }
                }
            }
        }

        footer {
            position: sticky;
            bottom: 0px;
            background-color: #fff;
            padding: 30px;
            box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);

            form {
                display: flex;

                input[type="text"] {
                    flex: 1 1 100%;
                    appearance: none;
                    border: none;
                    outline: none;
                    background: none;
                    display: block;
                    width: 100%;
                    padding: 10px 15px;
                    border-radius: 8px 0px 0px 8px;

                    color: #333;
                    font-size: 18px;
                    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
                    background-color: #f3f3f3;
                    transition: 0.4s;

                    &::placeholder {
                        color: #888;
                        transition: 0.4s;
                    }
                }

                input[type="submit"] {
                    appearance: none;
                    border: none;
                    outline: none;
                    background: none;
                    display: block;
                    padding: 10px 15px;
                    border-radius: 0px 8px 8px 0px;
                    background-color: var(--couleur-principale);
                    color: #fff;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                }
            }
        }
    }
}

@media screen and (min-width: 768px) {
    body {
        width: auto;
        height: auto;
        margin-left: auto;
        margin-right: auto;
    }

    .login-form {
        width: 500px !important;
        padding: 30px;

        .form-inner {
            padding: 50px 30px;

            h1 {
                font-size: 32px;
            }

            label {
                font-size: 18px;
            }

            input[type="text"] {
                font-size: 20px;
            }

            input[type="submit"] {
                font-size: 20px;
            }
        }
    }
}</style>
