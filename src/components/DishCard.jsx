const MenuItemCard = ({ name, description, price, category, image, ingredients, isVeg, isGlutenFree }) => {
    
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        {/* Image Section */}
        <div className="relative h-48 w-full">
          <img
            src={image || 'https://via.placeholder.com/150'}
            alt={name}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
            {category}
          </div>
        </div>
  
        {/* Content Section */}
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <span className="text-lg font-semibold text-green-600">₹ {price.toFixed(2)}</span>
          </div>
  
          <p className="text-gray-600 mb-4">{description}</p>
  
          {ingredients.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Ingredients:</h4>
              <div className="flex flex-wrap gap-1">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
  
        {/* Dietary Info Section */}
        <div className="px-4 pb-4 mt-auto">
          <div className="flex gap-2">
            {isVeg && (
              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Vegetarian
              </span>
            )}
            {isGlutenFree && (
              <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                Gluten Free
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default MenuItemCard;