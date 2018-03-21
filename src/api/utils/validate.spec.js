import chai, { expect } from 'chai';
import validate from './validate';


describe('Util Validate', () => {
  describe('Smoke tests', () => {
    it('should exists the `minMax` method', () => {
      expect(validate.minMax).to.exist;
    });
    it('should exists the `email` method', () => {
      expect(validate.email).to.exist;
    });
  });

  context('minMax' , () => {
    it('should `true` when the string length is 100 and use default MAX param value', () => {
      expect(validate.minMax('l'.repeat(100))).to.be.true;
    });

    it('should `true` when the string length is 3 and use default MIN param value', () => {
      expect(validate.minMax('l'.repeat(3))).to.be.true;
    });

    it('should `true` when the string length is 3 in min 2 max 3', () => {
      expect(validate.minMax('luk', 2, 3)).to.be.true;
    });

    it('should `true` when the string length is 2 in min 2 max 3', () => {
      expect(validate.minMax('lu', 2, 3)).to.be.true;
    });

    it('should `true` when the string length is 5 in min 2 max 9', () => {
      expect(validate.minMax('luket', 2, 9)).to.be.true;
    });

    it('should `false` when the string have more then 4', () => {
      expect(validate.minMax('hhuuhuhuhuhuh', 1, 4)).to.be.false;
    });

    it('should `false` when the string is empty', () => {
      expect(validate.minMax('', 1, 4)).to.be.false;
    });
  });

  context('email' , () => {
    const emailValid = 'lhenrique@gattecnologia.com.br';
    const emailInvalid = 'lhenriquegattecnologia.com.br';

    it(`should 'true' when passed param valid email '${emailValid}'`, () => {
      expect(validate.email(emailValid)).to.be.true;
    });

    it(`should 'false' when passed param invalid email '${emailInvalid}'`, () => {
      expect(validate.email(emailInvalid)).to.be.false;
    });
    
    it('should `false` when passed empty param', () => {
      expect(validate.email('')).to.be.false;
    });
  });

  context('alphanumUnderline' , () => {
    const validAlphanumUnderline = 'lukete_';
    const inValidAlphanumUnderlineSize = 'Lukete Henrique_';
    const inValidAlphanumUnderline = 'Lukete H _';

    it(`should 'true' when passed param valid alphanumeric with underline '${validAlphanumUnderline}'`, () => {
      expect(validate.alphanumUnderline(validAlphanumUnderline)).to.be.true;
    });

    it(`should 'false' when passed param invalid alphanumeric '${inValidAlphanumUnderline}'`, () => {
      expect(validate.alphanumUnderline(inValidAlphanumUnderline)).to.be.false;
    });

    it(`should 'false' when passed param invalid alphanumeric size'${inValidAlphanumUnderlineSize}'`, () => {
      expect(validate.alphanumUnderline(inValidAlphanumUnderlineSize)).to.be.false;
    });

  });
});