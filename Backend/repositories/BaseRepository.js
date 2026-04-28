class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data, options = {}) {
    if (options.session) {
      const docs = await this.model.create([data], { session: options.session });
      return docs[0];
    }
    return await this.model.create(data);
  }

  async findById(id, populateOptions = '') {
    let query = this.model.findById(id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    return await query.exec();
  }

  async findOne(filter, populateOptions = '') {
    let query = this.model.findOne(filter);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    return await query.exec();
  }

  async findAll(filter = {}, options = {}, populateOptions = '') {
    let query = this.model.find(filter);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    if (options.sort) {
      query = query.sort(options.sort);
    }
    return await query.exec();
  }

  async updateById(id, data, options = { new: true, runValidators: true }) {
    return await this.model.findByIdAndUpdate(id, data, options);
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteOne(filter) {
    return await this.model.findOneAndDelete(filter);
  }
}

module.exports = BaseRepository;
