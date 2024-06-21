const Company = require('../models/Company');

exports.createCompany = async (req, res) => {
  const { name, address, contactInfo, description } = req.body;
  try {
    const newCompany = new Company({
      name,
      address,
      contactInfo,
      description,
      createdBy: req.user.id
    });

    const company = await newCompany.save();
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateCompany = async (req, res) => {
  const { name, address, contactInfo, description } = req.body;
  try {
    let company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    company.name = name || company.name;
    company.address = address || company.address;
    company.contactInfo = contactInfo || company.contactInfo;
    company.description = description || company.description;

    await company.save();
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Company removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
