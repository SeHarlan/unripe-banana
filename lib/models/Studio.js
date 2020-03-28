const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: String,
    state: String,
    country: String
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});
schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio',
});
schema.statics.popFilmsForGivenId = function(id) {
  return this.aggregate([
    {
      '$match': {
        '_id': id
      }
    }, {
      '$lookup': {
        'from': 'films', 
        'localField': '_id', 
        'foreignField': 'studio', 
        'as': 'films'
      }
    }, {
      '$project': {
        '_id': true, 
        'name': true, 
        'address': true, 
        '__v': true, 
        'films': {
          'title': true, 
          '_id': true
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Studio', schema)
;
