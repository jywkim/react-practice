export default class Account {
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