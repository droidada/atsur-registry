import NextAuth from 'next-auth/next';

interface IUser
{
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    role: string,
}

declare module 'next-auth'
{
    interface User extends IUser { }
    interface Session
    {
        user: IUser,
        accessToken: string,
        refreshToken: string;
    }
}


declare module 'next-auth/jwt' {
    interface JWT
    {
        user;
    }
}
