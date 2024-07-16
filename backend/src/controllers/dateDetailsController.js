const DateDetails = require('../models/dateDetails-Model');

// Get all date details
exports.getAllDateDetails = async (req, res) => {
    try {
        const user_id = req.decoded.subject;
        const dateDetails = await DateDetails.getAllDateDetails(user_id);
        res.status(200).json(dateDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get date details by ID
exports.getDateDetailsById = async (req, res) => {
    try {
        const user_id = req.decoded.subject;
        const dateDetail = await DateDetails.getDateDetailsById(user_id);
        if (dateDetail) {
            res.status(200).json(dateDetail);
        } else {
            res.status(404).json({ message: 'Date detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get date details by specific date
exports.getDateDetailsByDate = async (req, res) => {
    const date = req.params.date;
 
    const user_id = req.decoded.subject
    
    try {
       
      
         // assuming date is passed as a URL parameter
        const dateDetails = await DateDetails.getDateDetailsByDate(date,user_id);
        if (dateDetails.length > 0) {
            res.status(200).json(dateDetails);
        } else {
            res.status(404).json({ message: 'No details found for the specified date' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get date details by specific month and year
exports.getDateDetailsByMonthYear = async (req, res) => {
    try {
        const user_id = req.decoded.subject;
        const month = req.params.month; // assuming month is passed as a URL parameter
        const year = req.params.year; // assuming year is passed as a URL parameter
        const dateDetails = await DateDetails.getDateDetailsByMonthYear(month, year, user_id);
        if (dateDetails.length > 0) {
            res.status(200).json(dateDetails);
        } else {
            res.status(404).json({ message: 'No details found for the specified month and year' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new date details
exports.createDateDetails = async (req, res) => {
    try {
        const user_id = req.decoded.subject;
        const newDateDetails = await DateDetails.createDateDetails(user_id,req.body);
        res.status(201).json(newDateDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update date details
exports.updateDateDetails = async (req, res) => {
    try {
        const userId = req.decoded.subject;
        const updatedDateDetails = await DateDetails.updateDateDetails(userId, req.params.id, req.body);
        if (updatedDateDetails !== null) {
            res.status(200).json(updatedDateDetails);
        } else {
            res.status(404).json({ message: 'Date detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete date details
exports.deleteDateDetails = async (req, res) => {
    try {
        const userId = req.decoded.subject;
        const deleted = await DateDetails.deleteDateDetails(userId, req.params.id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Date detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

