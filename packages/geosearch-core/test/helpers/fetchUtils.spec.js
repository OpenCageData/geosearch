import { expect } from 'chai';
import { checkResponseStatus } from '../../src/helpers/fetchUtils';

describe('geosearch-core:Fetch', () => {
  it(`should return true when the value is an HTTP 200 response`, () => {
    const res = {
      ok: true,
      status: 200,
      statusText: 'OK',
    };
    expect(checkResponseStatus(res)).to.equal(res);
  });
  it(`should throw an error when the value is an HTTP 401 response`, () => {
    const res = {
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    };
    const badRequest = () => {
      checkResponseStatus(res);
    };
    expect(badRequest).to.throw();
    expect(badRequest).to.throw(/401 \(Unauthorized\)/);

    try {
      badRequest();
    } catch (err) {
      expect(err.status).to.equal(401);
      expect(err.statusText).to.equal('Unauthorized');
    }
  });
});
