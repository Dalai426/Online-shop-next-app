class APIFilters{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.get(["keyword"])?{
            name:{
                $regex:this.queryStr.get(["keyword"]),
                $options:"i"
            }
        }:{};
       
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter(){
        const queryCopy=Object.fromEntries(this.queryStr.entries());

        
        const removeFields=['keyword','page'];
        removeFields.forEach((el)=>{delete queryCopy[el]});

        let output={};
        let prop="";

        for(let key in queryCopy){
            if(!key.match(/\b(gt|gte|lt|lte)/)){
                output[key]=queryCopy[key];
            }else{
                prop=key.split('[')[0];
                let operator=key.match(/\[(.*)\]/)[1];
                if (!output[prop]) {
                    output[prop] = {};
                }
                output[prop][`$${operator}`] = queryCopy[key];
            }
        }
        this.query.find(output);
        return this;
    }
    pagination(resPerPage){
        const currentPage=Number(this.queryStr.get(['page']))||1;
        console.log(currentPage);
        const skip=resPerPage * (currentPage-1);
        this.query=this.query.limit(resPerPage).skip(skip);
        return this;
    }



}
export default APIFilters;