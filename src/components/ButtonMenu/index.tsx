interface buttonMenuProps {
  handleMenuClick: ()=>void
}

export function ButtonMenu({handleMenuClick}: buttonMenuProps) {
    return (
      <button
        onClick={handleMenuClick}
        className="sm:hidden"
    >Menu</button>
    )
  }
  
  