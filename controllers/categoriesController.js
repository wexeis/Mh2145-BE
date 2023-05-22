import Category from "../models/categoriesModel.js";

export  const findCategories = async(req, res) =>{
try {
   const allCategories = await Category.find({});
      if (allCategories.length > 0) {
        return res.status(200).json(allCategories);
      }
      return res.status(404).json({ message: "No category found." });
    
} catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "Failed to find categories." });
  }
}


export  const findACategory = async(req, res) =>{
    const id = req.params.id
    try {
        const category = await Category.find({_id: id})
        if (category) {
            return res.status(200).json(category);
          }
          else res.status(404).jsonn(`category: ${id} do not exost`)
        
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete categor." });
      }
    }


 export  const createACatergory = async(req, res) =>{
    const {categoryName} = req.body
        try {
          
        
            if(categoryName.length == 0){
                return res.status(400).json('enter a category name')
            }

            const findCategoryName = await Category.find({categoryName})

         if(findCategoryName.length > 0) {
                console.log('searching...')
                return res.status(400).json(` ${categoryName} category do already exist`)
            }
            
            const category = await new Category({
                categoryName
            })
            category.save()

            return res.status(201).json(category )
            
        } catch (error) {
            return res.status(500).json({ message: "Failed to create category." });
          }
        }

export  const updateAcategory = async(req, res) =>{
    const id = req.params.id
    const categoryName = req.body.categoryName

            try {
                const findCategory = await Category.find({_id: id})
                if(findCategory.length == 0){
                    return res.status(400).json(`${id} not found`)
                }
                if(categoryName.length == 0){
                    return res.status(400).json('enter a category name')
                }

                const findCategoryName = await Category.find({categoryName: categoryName})

                 if(findCategoryName.length > 0) {
                    return res.status(400).json(`category: ${categoryName} do already exist`)
                }

                const updatedCategory = await Category.findByIdAndUpdate(id, {categoryName: categoryName}, {new: true})
                console.log("updating...")
                return res.status(200).json(updatedCategory)
                
            } catch (error) {
                return res.status(500).json({ message: "Failed to update category." });
              }
            }

export  const deleteAcategory = async(req, res) =>{
    try {
        const id = req.params.id
        await Category.findByIdAndDelete(id)
        return res.status(204).json({ message: `${id} Category deleted` }   )
        
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete user." });
      }
  }