import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json';
import { server } from './../../server';

chai.use(chaiHttp);
chai.use(chaiJson);

describe('Routes', () => {
  before(function(done) {
    server.close();
    done();
  });

  context('Routes (/)', () => {
    it('should exists verb POST ', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res).have.status(200);
          done();
        });
    });
    
  });
});
