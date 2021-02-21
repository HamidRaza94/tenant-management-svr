/*
 * Utils Unit
 *
 * @group unit
 */

import { formatError, getAssignedResources, getMyDashboardClientNames, getDashboardResult, getMyDashboardClientCodes,
    getPermittedClients, hasValidReourceAssignedTokenBasedV1, mapToResource, mapToServiceResources,
    removeDuplicateAssignee, removeEmptyObject, Helpers } from './Helpers';
import { errorHandler } from './errorHandler';

describe('General (general.ts) module:', () => {
    it('When empty object is passed to removeEmptyObject method, should return success response', (done) => {
        const result = removeEmptyObject({ });
        expect(result).toStrictEqual({});
        done();
    });

    it('When object having data as a key is passed to removeEmptyObject method, should return rest object', (done) => {
        const result = removeEmptyObject({ data: { type: "type", content: "content", version: "version" } });
        expect(result).toStrictEqual({});
        done();
    });

    it('When individual res is passed to getMyDashboardClientCodes method, should return success response', (done) => {
        const result = getMyDashboardClientCodes(
            ["CLM:BMW:*:clientDetails:c,r,u,d", "CLM:GOO:*:clientDetails:c,r,u,d"],
        );
        expect(result).toStrictEqual(["BMW", "GOO"]);
        done();
    });

    it('When all resources is passed to getMyDashboardClientCodes method, should return success response', (done) => {
        const result = getMyDashboardClientCodes(["CLM:*:*:clientDetails:c,r,u,d"]);
        expect(result).toStrictEqual([]);
        done();
    });

    it('When all resources is passed to getMyDashboardClientCodes method, should return success response', (done) => {
        const result = getMyDashboardClientCodes(["*:*:*:*:c,r,u,d"]);
        expect(result).toStrictEqual([]);
        done();
    });

    it('When valid value is passed to getAssignedResources method, should return success response', (done) => {
        const result = getAssignedResources(["CLM:BMW:*:clientDetails:c,r,u,d", "CLM:BMW:*:accounts:c,r,u,d"],
        "BMW", ["accounts"]);
        expect(result).toStrictEqual(["accounts"]);
        done();
    });

    it('When clientDetail resouce is passed to getDashboardResult method, should return success response', (done) => {
        const result = getDashboardResult([{ clientDetails: {
            progress: 0,
          } }], ["clientDetails"]);
        expect(result).toStrictEqual([[{ clientDetails: {
            progress: 0,
          } }]]);
        done();
    });

    it('When legalApprover resouce is passed to getDashboardResult method, should return success response', (done) => {
        const result = getDashboardResult([{ legalAuthorisation: {
            progress: 0,
          } }], ["legalApprover"]);
        expect(result).toStrictEqual([[{ legalAuthorisation: {
            progress: 0,
          } }]]);
        done();
    });

    it('When clientDataGovernance is passed to getDashboardResult method, should return success response', (done) => {
        const result = getDashboardResult([{ dataGovernance: {
            progress: 0,
          } }], ["clientDataGovernance"]);
        expect(result).toStrictEqual([[{ dataGovernance: {
            progress: 0,
          } }]]);
        done();
    });

    it('When financeApprover is passed to getDashboardResult method, should return success response', (done) => {
        const result = getDashboardResult([{ financeAuthorisation: {
            progress: 0,
          } }], ["financeApprover"]);
        expect(result).toStrictEqual([[{ financeAuthorisation: {
            progress: 0,
          } }]]);
        done();
    });

    it('When valid value is passed to formatError method, should return success response', (done) => {
        const result = formatError({ extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
        } });
        expect(result.message).toBe("Bad Request");
        done();
    });

    it('When valid value is passed to removeDuplicateAssignee method, should return success response', (done) => {
        const result = removeDuplicateAssignee([]);
        expect(result).toStrictEqual([]);
        done();
    });

    it('When valid value is passed to mapToResource method, should return success response', (done) => {
        const result = mapToResource("abc");
        expect(result).toBe('');
        done();
    });

    it('When clientDetails passed to mapToServiceResources method, should return success response', (done) => {
        const result = mapToServiceResources("clientDetails");
        expect(result).toStrictEqual('ClientDetails');
        done();
    });

    it('When clientDataGovernance passed to mapToServiceResources method, should return success response', (done) => {
        const result = mapToServiceResources("clientDataGovernance");
        expect(result).toStrictEqual('ClientDataGovernance');
        done();
    });

    it('When financeApprover passed to mapToServiceResources method, should return success response', (done) => {
        const result = mapToServiceResources("financeApprover");
        expect(result).toStrictEqual('Finance');
        done();
    });

    it('WWhen legalApprover passed to mapToServiceResources method, should return success response', (done) => {
        const result = mapToServiceResources("legalApprover");
        expect(result).toStrictEqual('Legal');
        done();
    });

    it('When accounts passed to mapToServiceResources method, should return success response', (done) => {
        const result = mapToServiceResources("accounts");
        expect(result).toStrictEqual('accountSettings');
        done();
    });

    it('When ONBD passed to mapToServiceResources method, should return success response', (done) => {
        const result = mapToServiceResources("ONBD");
        expect(result).toStrictEqual('Onboarding');
        done();
    });

    it('When invalid resource passed to mapToServiceResources method, should return success response', (done) => {
        const result = mapToServiceResources("abc");
        expect(result).toStrictEqual('');
        done();
    });

    it('When super user perm passed to hasValidReourceAssignedTokenBasedV1 method, should return success response',
        (done) => {
        const result = hasValidReourceAssignedTokenBasedV1(
            ["CLM:BMW:*:clientDetails:c,r,u,d", "CLM:GOO:*:clientDetails:c,r,u,d", "*:*:*:*:c,r,u,d"],
        );
        expect(result).toStrictEqual(false);
        done();
    });
    it('When invalid res. comb. passed to hasValidReourceAssignedTokenBasedV1 method, should return success response',
        (done) => {
        const result = hasValidReourceAssignedTokenBasedV1(
            ["CLM:BMW:*:clientDetails:c,r,u,d", "CLM:BMW:*:financeApprover:c,r,u,d"],
            ["clientDetails", "financeApprover"],
        );
        expect(result).toStrictEqual(false);
        done();
    });

    it('When CLM lead resource passed to hasValidReourceAssignedTokenBasedV1 method, should return success response',
        (done) => {
        const result = hasValidReourceAssignedTokenBasedV1(["CLM:*:*:*:c,r,u,d"], ["clientDetails", "financeApprover"]);
        expect(result).toStrictEqual([]);
        done();
    });

    it('When invalid resource passed to hasValidReourceAssignedTokenBasedV1 method, should return success response',
        (done) => {
        const result = hasValidReourceAssignedTokenBasedV1(
            ["CLM:BMW:*:financeApprover:c,r,u,d", "CLM:BMW:*:legalApprover:c,r,u,d"],
            ["legalApprover", "financeApprover"],
        );
        expect(result).toStrictEqual(false);
        done();
    });

    it('When user perm  passed to getPermittedClients method, should return success response', (done) => {
        const result = getPermittedClients(["*:BMW:*:*:c,r,u,d"]);
        expect(result).toStrictEqual(["BMW"]);
        done();
    });

    it('When client lead resource passed to getMyDashboardClientNames method, should return success response',
        (done) => {
        const result = getMyDashboardClientNames(["*:BMW:*:*:c,r,u,d"], [{ clientCode: "BMW" }]);
        expect(result).toStrictEqual([{ clientCode: "BMW" }]);
        done();
    });
});

describe('Error Handler module:', () => {
    it('When status code of 403 is passed to error hander, should return error response', (done) => {
        try {
            errorHandler({ extensions: { response: { body: { message: "FORBIDDEN", status: 403, error: "" } } } });
        } catch (err) {
            expect(err.message).toBe('FORBIDDEN');
        }
        done();
    });

    it('When status code of 403 is passed to error hander, should return error response', (done) => {
        try {
            errorHandler({ extensions: { response:
                { body: { message: "AuthenticationError", status: 401, error: "" } } } });
        } catch (err) {
            expect(err.message).toBe('AuthenticationError');
        }
        done();
    });

    it('When status code of 403 is passed to error hander, should return error response', (done) => {
        try {
            errorHandler({ extensions: { response:
                 { body: { message: "INTERNAL SERVER ERROR", status: 501, error: "" } } } });
        } catch (err) {
            expect(err.message).toBe('INTERNAL SERVER ERROR');
        }
        done();
    });

    it('When empty object passed to checkToken method, should return false', (done) => {
        const result = Helpers.checkToken({});
        expect(result).toBe(false)
        done();
    });

    it('When authorization key in object passed to checkToken method, should return true', (done) => {
        const result = Helpers.checkToken({ authorization: 'Bearer token' });
        expect(result).toBe(true)
        done();
    });

    it('When empty object passed to getQueryString method, should return null', (done) => {
        const result = Helpers.getQueryString({});
        expect(result).toBe(null)
        done();
    });

    it('When query string is passed to getQueryString method, should return success response', (done) => {
        const result = Helpers.getQueryString({ qs: '?param' });
        expect(result).toBe('?qs=%3Fparam');
        done();
    });
});
