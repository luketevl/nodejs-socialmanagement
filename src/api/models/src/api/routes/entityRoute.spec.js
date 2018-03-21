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

  context('Routes to Entity (/entity)', () => {

    it('should exists verb GET when get ALL', (done) => {
      chai.request(server)
        .get('/entity')
        .end((err, res) => {
          expect(res).have.status(200);
          done();
        });
    });

    it('should exists verb GET when get one', (done) => {
      chai.request(server)
        .get('/entity/123456')
        .end((err, res) => {
          expect(res).have.status(400);
          done();
        });
    });

    it('should exists verb POST ', (done) => {
      chai.request(server)
        .post('/entity')
        .end((err, res) => {
          expect(res).have.status(400);
          done();
        });
    });

    it('should exists verb PATCH ', (done) => {
      chai.request(server)
        .patch(`/entity/123456`)
        .end((err, res) => {
          expect(res).have.status(400);
          done();
        });
    });

    it('should exists verb DELETE ', (done) => {
      chai.request(server)
        .delete(`/entity/123456`)
        .end((err, res) => {
          expect(res).have.status(400);
          done();
        });
    });
    
    it('should exists `/logout` ', (done) => {
      chai.request(server)
        .delete(`/entity/logout`)
        .end((err, res) => {
          expect(res).have.status(200);
          done();
        });
    });

    it('should exists `/login` ', (done) => {
      chai.request(server)
        .delete(`/entity/login`)
        .end((err, res) => {
          expect(res).have.status(403);
          done();
        });
    });

  });
});
