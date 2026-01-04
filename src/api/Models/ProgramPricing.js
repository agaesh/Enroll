import { Model, DataTypes } from "sequelize";

exports.default = (sequelize) => {
    class ProgramPricing extends Model {
        static associate(models) {
            ProgramPricing.belongsTo(models.ProgramCourse, {
                foreignKey: 'ref_id',
                as: 'programCourse',
            });
        }
        // Get the most recent price for a given ref_id and price_type
        static async getLatestPrice(ref_id, price_type) {
            return await this.findOne({
            where: { ref_id, price_type },
            order: [['effective_date', 'DESC']],
            });
        }

        // Get the currently effective price (based on today's date)
        static async getCurrentPrice(ref_id, price_type) {
            const today = new Date();
            return await this.findOne({
            where: {
                ref_id,
                price_type,
                effective_date: { [sequelize.Op.lte]: today },
                [sequelize.Op.or]: [
                { effective_to: null },
                { effective_to: { [sequelize.Op.gte]: today } }
                ]
            },
            order: [['effective_date', 'DESC']],
            });
        }
        // Get all prices for a given ref_id and ref_type
        static async getPricesByRefType(ref_id, ref_type) {
            return await this.findAll({
            where: { ref_id, ref_type },
            order: [['effective_date', 'DESC']],
            });
        }
        static async getAllPrices(ref_id) {
            return await this.findAll({
            where: { ref_id },
            order: [['effective_date', 'DESC']],
            });
        }
        static async getPricesInDateRange(ref_id, startDate, endDate) {
            return await this.findAll({
            where: {
                ref_id,
                effective_date: {
                [sequelize.Op.between]: [startDate, endDate]
                }
            },
            order: [['effective_date', 'DESC']],
            });
        }
        static getAveragePrice(ref_id, price_type) {
            return this.findAll({
            where: { ref_id, price_type },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('price')), 'average_price']
            ],
            raw: true,
            });
        }
        static getPriceHistory(ref_id, price_type) {
            return this.findAll({
            where: { ref_id, price_type },
            attributes: ['price', 'effective_date', 'effective_to'],
            order: [['effective_date', 'ASC']],
            raw: true,
            });
        }
    }
    ProgramPricing.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },  
            price_type: {
                type: DataTypes.ENUM("LAB_FEE", "TUITION_FEE", "MATERIAL_FEE", 'EXAM_FEE', 'FLAT_FEE', 'OTHER_FEE'),
                allowNull: false
            },

            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            effective_date: {
                type: DataTypes.DATE,   
            },
            effective_to: {
                type: DataTypes.DATE,
            },
            ref_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ProgramCourses',
                    key: 'id'
                }
            },
            ref_type: {
                type: DataTypes.ENUM('PROGRAM', 'COURSE', 'LAB','RESOURCE'),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "ProgramPricing",
            tableName: "ProgramCoursePricings",
            timestamps: true,
        }
    );
    
    return ProgramPricing;
}