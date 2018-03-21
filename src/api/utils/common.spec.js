import chai, { expect } from 'chai';
import * as utils from './common';


describe('Util Commons', () => {
  
  describe('Smoke tests', () => {
    it('should exists the `haveRequiredFields` method', () => {
      expect(utils.haveRequiredFields).to.exist;
    });
  });
  
  context('haveRequiredFields' , () => {
    const requiredFields = {
      name: 'lukete',
      age: 25
    };

    it('should `false` when object dont have required keys', () => {
      expect(utils.haveRequiredFields(requiredFields, {name: 'henrique'})).to.be.false;
    });
    it('should `true` when object have required keys', () => {
      expect(utils.haveRequiredFields(requiredFields, {name: 'henrique', age: 99 })).to.be.true;
    });
    it('should `true` when object have more that required keys', () => {
      expect(utils.haveRequiredFields(requiredFields, {name: 'henrique', age: 99, gener: 'M' })).to.be.true;
    });
  })
});
  