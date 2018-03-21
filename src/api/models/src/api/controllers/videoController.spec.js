import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json';
import { server } from './../../server';
import * as videoController from './videoController';

chai.use(chaiHttp);
chai.use(chaiJson);

describe('Video Controller', () => {
  before(function(done) {
    server.close();
    done();
  });

  describe('Smoke tests', () => {
    
    it('should exists the `get` method', () => {
      expect(videoController.getAll).to.exist;
    });
  });


  context('save method', () => {
  
    // it('should return status `true` when received correct data', () => {
    //   const result = entityController.save(entityMocks.correctFemaleDataEntity);
    //   expect(result).to.include({
    //     status: true,
    //   });
    // });
  });

});
