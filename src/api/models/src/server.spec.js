import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json';
import { server } from './server';

chai.use(chaiHttp);
chai.use(chaiJson);

describe('Server', () => {
  before(function(done) {
    server.close();
    done();
  });

  it('should status code 200 and json body in route /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).be.a.jsonObj();
        done();
      });
  });
});
