const Mocha = require('mocha');
const assert = require('assert');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, 'solution', mocha);

class Account {
    constructor(config = {}) {
        this.config = config;
        this.rentTotal = 0;
    }

    rentRoll() {
        return this.rentTotal;
    }

    addProperty(rent, expense) {
        let net = 0;
        rent = rent || 0;
        expense = expense || 0;
        if (this.config.grossOrNet === 'net') {
            net = rent - expense;
        } else {
            net = rent;
        }
        this.rentTotal += net;
    }
  }

  describe('Account', () => {
    describe('rent roll', () => {
      it('returns a rent roll', () => {
        const account = new Account();
        assert(account.rentRoll() === 0, 'rent roll should be 0');
      });

      it('returns the sum of the properties rent', () => {
        const account = new Account({ grossOrNet: "gross" });
        account.addProperty(5000);
        account.addProperty(500);
        assert.equal(account.rentRoll(), 5500);
      });
    });

    describe('when the account is configured for the net rent roll', () => {
        it('returns the sum of the properties rent minus their expenses', () => {
          const account = new Account({ grossOrNet: "net" });
          account.addProperty(5000, 500);
          account.addProperty(500, 100);
          assert.equal(account.rentRoll(), 4900);
        });
      });
  });

  mocha.run();