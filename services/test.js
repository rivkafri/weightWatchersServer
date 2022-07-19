const usersService = require('./users.service');

describe("users tests", () => {

    test('getUsers returns an array', () => {
        const result = usersService.getUsers();
        expect(typeof result).toEqual(typeof Array())
    });

    test('getUserById -the id type is true', () => {
        usersService.getUserById().then((req) => {
            expect(typeof req.params.id).toBe(typeof String());
        })
    });

    test('deleteUser-must be id', () => {
        usersService.deleteUser().then((req) => {
            expect(req.params.id === '').to.have.status(404)
        })
    });

});


