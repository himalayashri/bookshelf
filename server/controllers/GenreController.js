const Genre = require('../models/Genre');

exports.getGenre = async (req, res) => {
    try {
        let genreData = await Genre.find({})
        if (!genreData) {
            return res.status(400).json({ errors: "Cant find Genre Data" })
        }
        return res.status(200).json({ success: true, data: genreData })

    } catch (error) {
        console.error(error);
    }
}