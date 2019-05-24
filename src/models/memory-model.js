'use strict';

const uuid = require('uuid/v4');
/**
 * Class for memory-model for categories
 */
class Model {
  /**
   * schema constructor
   * @param {*} schema
   */
  constructor(schema) {
    this.schema = schema;
    this.database = [];
  }
  /**
   * validate schema entry
   * @param {*} entry
   */
  sanitize(entry) {
    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach(field => {
      if (this.schema[field].required) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      } else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }
  /**
   * count number of items in database
   */
  count() {
    return this.database.length;
  }
  /**
   * model for get
   * @param {*} id
   */
  get(id) {
    const records = id
      ? this.database.filter(record => record._id === id)
      : this.database;
    return Promise.resolve(records);
  }
  /**
   * model for post
   * @param {} entry
   */
  post(entry) {
    entry._id = uuid();
    let record = this.sanitize(entry);
    if (record._id) {
      this.database.push(record);
    }
    return Promise.resolve(record);
  }
  /**
   * model for delete
   * @param {*} id
   */
  delete(id) {
    this.database = this.database.filter(record => record._id !== id);
    return this.get(id);
  }
  /**
   * model for put
   * @param {} id
   * @param {*} entry
   */
  put(id, entry) {
    let record = this.sanitize(entry);
    if (record._id) {
      this.database = this.database.map(item =>
        item._id === id ? record : item
      );
    }
    return this.get(id);
  }
}

module.exports = Model;
