let chai = require('chai');
let idPeticionborrar;
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require("dotenv").config();


chai.use(chaiHttp);
const url ='http://localhost:3000/api/v1';

describe('Get song: ', () => {
  it('should get successfully', (done) => {
    chai.request(url)
    .get('/songs')
    .send()
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
}); 

describe('Get song: orden 1 ', () => {
  it('should get successfully', (done) => {
    chai.request(url)
    .get('/songs/orderByAddedDescendant')
    .send()
    .end(function(err, res) {
      let i=0;
      while(i<10){
        var coolVar = res.body[i].added;
        var coolVar2 = res.body[i+1].added;
        var partsArray = coolVar.split('‑');
        var partsArray2 = coolVar2.split('‑');
        expect(parseInt(partsArray[0])).to.be.greaterThanOrEqual(parseInt(partsArray2[0]))
        if(parseInt(partsArray[0])==parseInt(partsArray2[0])){
          expect(parseInt(partsArray[1])).to.be.greaterThanOrEqual(parseInt(partsArray2[1]))
          if(parseInt(partsArray[1])==parseInt(partsArray2[1])){
            expect(parseInt(partsArray[2])).to.be.greaterThanOrEqual(parseInt(partsArray2[2]))
          }
        }
        i++;
      }
      expect(res).to.have.status(200);
      done();
    });
  });
}); 

describe('Get song: orden 2 ', () => {
  it('should get successfully', (done) => {
    chai.request(url)
    .get('/songs/orderByYearReleasedAscendant')
    .send()
    .end(function(err, res) {
      let i=1;
      while(i<10){
        var coolVar = res.body[i].year_released;
        var coolVar2 = res.body[i+1].year_released;
        expect((coolVar)).to.be.lessThanOrEqual((coolVar2))
        i++;
      }
      expect(res).to.have.status(200);
      done();
    });
  });
}); 

describe('Get song: id ', () => {
  it('should get successfully', (done) => {
    chai.request(url)
    .get('/songs/627838d7d9168a538d80df86')
    .send()
    .end(function(err, res) {
      expect(res.body).to.have.property('_id').to.be.equal('627838d7d9168a538d80df86');
      expect(res).to.have.status(200);
      done();
    });
  });
}); 

describe('Get song: id negative ', () => {
  it('test should get successfully', (done) => {
    chai.request(url)
    .get('/songs/11')
    .send()
    .end(function(err, res) {
      expect(res).to.have.status(400);
      done();
    });
  });
}); 


describe('Get song: title ', () => {
  it('should get successfully', (done) => {
    chai.request(url)
    .get('/songs/title/I Need A Dollar')
    .send()
    .end(function(err, res) {
      expect(res.body[0]).to.have.property('title').to.be.equal('I Need A Dollar');
      expect(res).to.have.status(200);
      done();
    });
  });
}); 

describe('Get song: title negative', () => {
  it('test should get successfully', (done) => {
    chai.request(url)
    .get('/songs/title/')
    .send()
    .end(function(err, res) {
      expect(res).to.have.status(400);
      done();
    });
  });
}); 



describe('Get song: artist ', () => {
  it('should get successfully', (done) => {
    chai.request(url)
    .get('/songs/artist/Aloe Blacc')
    .send()
    .end(function(err, res) {
      expect(res.body[0]).to.have.property('artist').to.be.equal('Aloe Blacc');
      expect(res).to.have.status(200);
      done();
    });
  });
}); 

describe('Get song: artist negative', () => {
  it('should get successfully', (done) => {
    chai.request(url)
    .get('/songs/artist/')
    .send()
    .end(function(err, res) {
      expect(res).to.have.status(400);
      done();
    });
  });
}); 


describe('Get song: crear ', () => {
  it('should get successfully', (done) => {
    chai.request(url)
    .post('/songs')
    .send({title: "STARSTRUKK", artist: "3OH!3", top_genre: "dance pop", year_released: 2009 ,added: "2022" ,dur: 203,"top_year":2010 })
    .end(function(err, res) {
      idPeticionborrar=res.body._id;
      expect(res).to.have.status(200);
      done();
    });
  });
}); 

describe('Get song: borrar ', () => {
  it('should get successfully', (done) => {
    chai.request(url)
    .delete('/songs/'+idPeticionborrar)
    .send()
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
}); 




describe('Get song: modificar ', () => {
  it('should get successfully', (done) => {
    chai.request(url)
    .put('/songs/6279760019616501981c66ce')
    .send({title: "modificado", artist: "tambien", top_genre: "dance pop", year_released: 2009 ,added: "2022" ,dur: 203,"top_year":2010 })
    .end(function(err, res) {
      expect(res.body).to.have.property('title').to.be.equal('modificado');
      expect(res).to.have.status(200);
      done();
    });
  });
}); 
