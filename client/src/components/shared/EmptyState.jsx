const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="text-center py-16 px-4">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-gray-300" />
        </div>
      )}
      <h3 className="font-heading font-bold text-lg text-brand-dark mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-sm mx-auto mb-4">{description}</p>}
      {action}
    </div>
  );
};

export default EmptyState;
