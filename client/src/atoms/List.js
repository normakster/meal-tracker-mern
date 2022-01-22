const List = (props) => {
    const { Head, children } = props;
    return (
        <div className='border border-info'>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr><Head /></tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

export default List;