export default function () {
  this.get('/users');
  this.get('/users/:id');
  this.post('/users');
  this.put('/users/:id');

  this.get('/observations');
  this.post('/observations');
}
