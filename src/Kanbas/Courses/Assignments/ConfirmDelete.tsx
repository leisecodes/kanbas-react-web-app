export default function ConfirmDelete({ onConfirm, onCancel }:
    { onConfirm: ()=> void; onCancel:()=> void; }) {
    

    return (
        <div className="modal fade" id="deleteModal" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="deleteModalLabel">Delete Assignment </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this assignment?
    
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onCancel} className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" onClick={onConfirm} data-bs-dismiss="modal" className="btn btn-primary">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
