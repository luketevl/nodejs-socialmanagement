import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonMongoose from 'sinon-mongoose';
import Entity from './entity';
import * as mockEntity from './../mocks/entity';

let EntityMock;
describe('Entity Model', () => {
  afterEach(() => {
    EntityMock = sinon.mock(Entity);
  });

  describe('Validate tests', () => {
    it('should be invalid if `name` is EMPTY', done => {
      const model = new Entity(mockEntity.notHasName);
      model.validate(err => {
          expect(err.errors.name).to.exist;
          done();
      });
  });

    it('should be invalid if `email` is EMPTY', done => {
      const model = new Entity(mockEntity.notHasEmail);
      model.validate(err => {
          expect(err.errors.email).to.exist;
          done();
      });
    });

    it('should be invalid if `email` is INVALID', done => {
      const model = new Entity( Object.assign(mockEntity.correctMaleDataEntity , {email: 'email.com' }));
      model.validate(err => {
          expect(err.errors.email).to.exist;
          done();
      });
    });
  });

  describe('Gets', () => {

  
    it('should return all entities', done => {
      const expectedResult = { status: true, entity: []};
      EntityMock.expects('find').yields(null, expectedResult);
      Entity.find((err, result) => {
        EntityMock.verify();
        EntityMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    it('should return error when fail in GET', done => {
      const expectedResult = { status: false, error: "Something went wrong" };
      EntityMock.expects('find').yields(expectedResult, null);
      Entity.find((err, result) => {
        EntityMock.verify();
        EntityMock.restore();
        expect(err.status).to.be.false;
        done();
      });
    });

  });

  describe('Creates', () => {

    it('should create new Entity when received correct data', done => {
      EntityMock = sinon.mock(new Entity(mockEntity.correctMaleDataEntity));
      const entity = EntityMock.object;
      const expectedResult = { status: true };
            EntityMock.expects('save').yields(null, expectedResult);
            entity.save((err, result) => {
                EntityMock.verify();
                EntityMock.restore();
                expect(result.status).to.be.true;
                done();
            });
    });

    it('should error when received incorrect data', done => {
      EntityMock = sinon.mock(new Entity(mockEntity.inCorrectMaleDataEntity));
      const entity = EntityMock.object;
      const expectedResult = { status: true };
            EntityMock.expects('save').yields(null, expectedResult);
            entity.save((err, result) => {
                EntityMock.verify();
                EntityMock.restore();
                expect(result.status).to.be.true;
                done();
            });
    });
  });

  describe('Deletes', () => {
    it('should delete when received the `_id`', done => {
      const ref = { _id: "5a81b862e3759d724ba90cd2"};
      const entity = EntityMock.object;
      const expectedResult = { status: true };
      EntityMock.expects('remove').withArgs(ref).yields(null, expectedResult);
      entity.remove(ref, (err, result) => {
        EntityMock.verify();
        EntityMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    it('should error in delete', done => {
      const ref = { _id: "5a81b862e3759d724ba90cd2"};
      const entity = EntityMock.object;
      const expectedResult = { status: false };
      EntityMock.expects('remove').withArgs(ref).yields(expectedResult, null);
      entity.remove(ref, (err, result) => {
        EntityMock.verify();
        EntityMock.restore();
        expect(err.status).to.be.false;
        done();
      })
    })
  });

  // describe('Updates', () => {
  //   it('should update when received the `_id`', done => {
  //     EntityMock = sinon.mock(new Entity({ gener: 'F' }));
  //     const entity = EntityMock.object; 
  //     console.log(entity);
  //     const expectedResult = { status: true };
  //     EntityMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);
  //     entity.save((err, result) => {
  //       EntityMock.verify();
  //       EntityMock.restore();
  //       expect(result.status).to.be.true;
  //       done();
  //     });
  //   });



    // it('should error in update', done => {
    //   const ref = { _id: "5a81b862e3759d724ba90cd2"};
    //   EntityMock = sinon.mock(new Entity({ gener: 'F'}));
    //   const entity = EntityMock.object;
    //   const expectedResult = { result: false };
    //   EntityMock.expects('save').withArgs({_id: "5a81b862e3759d724ba90cd2"}).yields(expectedResult, null);
    //   entity.save((err, result) => {
    //     EntityMock.verify();
    //     EntityMock.restore();
    //     expect(err.status).to.be.false;
    //     done();
    //   })
    // })
  // });
});
