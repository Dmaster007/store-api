const Product = require('../models/product');
// const { options } = require('../routes/products');
const getAllProductsSTATIC = async (req,res)=>{
        const search = 'dini';

     const products =   await Product.find({
       price:{$gt:30}
     }).sort('price').select('name price ')
     //.limit(4).skip(4)
   res.status(200).json({products,nbHit:products.length})
}
const getAllProduct = async (req,res)=>{
        const {company,feature,name,sort,field,numaricFilters} = req.query;
        const queryobject = {}
        if(company){
                queryobject.company = company;
        }
        if(name){
                queryobject.name = {$regex:name,$options:'i'};
        }
        if(feature){
                queryobject.feature = feature==='true'?true:false;
        }
        if(numaricFilters){
            //  console.log(numaricFilters);  
             const operatorMap= {
                '>': '$gt',
                '>=': '$gte',
                '<': '$lt',
                '<=': '$lte',
                '=': '$eq',

             }  
             const regEx =/\b(<|>|>=|<=|=|<)\b/g
             let filters = numaricFilters.replace(regEx,(match)=>("-"+operatorMap[match]+"-"))
            const  options = ['price', 'rating']
            filters=filters.split(',').forEach(element => {
                const [field,operator,value] = element.split('-')
                if(options.includes(field)){
                        queryobject[field] = {[operator]:Number(value)}
                }  
            });
            
        }
      console.log(queryobject);
      let result =  Product.find(queryobject)
      //sort
      if(sort){
        // products= product.sort(sort)
        const sortList = sort.split(',').join(' ');
        result= result.sort(sortList)
        
      }
      
      else{
        result= result.sort('createdAt')
      }
      //field
      if(field){
        const fieldList = field.split(',').join(' ');
        result= result.select(fieldList)
        
      }
      const page = Number(req.query.page||1)
      const limit = Number(req.query.limit||5)
      const skip = (page-1)*limit;
      result= result.skip(skip).limit(limit)
      const products= await result
        res.status(200).json({products,nbHit:products.length})
        
  
}
module.exports = {getAllProduct,getAllProductsSTATIC} 

