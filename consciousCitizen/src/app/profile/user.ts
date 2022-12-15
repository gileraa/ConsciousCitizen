export interface User {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    email: string,
    city: string,
    street: string,
    building: string,
    apartment: string,
    login: string,
    password: string,
    status: boolean,
    newsletter: boolean,
    role: {
        id: number,
        name: string
    }
}
