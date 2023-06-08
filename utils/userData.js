export const newUserData = (user) => {
    return {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        isAdmin: user.isAdmin
    }
}