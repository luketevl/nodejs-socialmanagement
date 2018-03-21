import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json';
import { server } from './../../server';
import * as entityController from './entityController';
import * as entityMocks from './../mocks/entity';

chai.use(chaiHttp);
chai.use(chaiJson);

describe('Entity Controller', () => {
  before(function(done) {
    server.close();
    done();
  });

  describe('Smoke tests', () => {
    
    it('should exists the `getAll` method', () => {
      expect(entityController.getAll).to.exist;
    });

    it('should exists the `get` method', () => {
      expect(entityController.get).to.exist;
    });
    
    it('should exists the `save` method', () => {
      expect(entityController.save).to.exist;
    });

    it('should exists the `update` method', () => {
      expect(entityController.update).to.exist;
    });

    it('should exists the `remove` method', () => {
      expect(entityController.remove).to.exist;
    });
    
    it('should exists the `login` method', () => {
      expect(entityController.login).to.exist;
    });

    it('should exists the `logout` method', () => {
      expect(entityController.logout).to.exist;
    });

    it('should exists the `avatarUpdate` method', () => {
      expect(entityController.avatarUpdate).to.exist;
    });

    it('should exists the `avatarGet` method', () => {
      expect(entityController.avatarGet).to.exist;
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
