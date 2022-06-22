import Service from '@ember/service';

export default class FilterDatesService extends Service {
  setStartDate(date) {
    this.dateStart = date;
  }

  setEndDate(date) {
    this.dateEnd = date;
  }

  clearDates() {
    this.dateEnd = null;
    this.dateStart = null;
  }
}
