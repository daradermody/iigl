import * as express from 'express';
import * as pmx from 'pmx';

class Monitoring {
  public router = express.Router();

  constructor() {
    this.countUniqueVisits();
  }

  private probe: any = pmx.probe();

  countUniqueVisits() {
    let uniqueVisits = 0;
    this.probe.metric({
      name: 'Unique visits',
      value: () => uniqueVisits
    });

    this.router.get('/', function (req, res, next) {
      uniqueVisits++;
      next();
    });
  }
}

export default new Monitoring().router;
