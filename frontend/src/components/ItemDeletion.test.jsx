import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DeleteFromCart from "./ItemDeletion";
import { test, expect, vi } from "vitest";


// Mock data
const renderComponent = (props = {}) => {
    return render(
        <DeleteFromCart
            id="123"
            title="Test Item"
            isOpen={true} 
            onClose={() => {}} 
            onConfirm={() => {}} 
            {...props} 
        />
    );
};


test("renderes Modal when isOpen is TRUE", () => {
    
    renderComponent();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
});


test("does NOT renderes Modal when isOpen is FALSE", () => {
    
    renderComponent({ isOpen: false });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});


test("title is rendered correctly", () => {
    
    renderComponent();

    const title = screen.getByRole("heading", {level: 2});

    expect(title).toHaveTextContent("Removing: Test Item");

});

test("closes modal on X button click", () => {
    const handleClose = vi.fn();

    renderComponent({ onClose: handleClose });
    
    waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    const button = screen.getByText("X");

    fireEvent.click(button);

    expect(handleClose).toHaveBeenCalled(2);
});

test("closes modal when clicking on the backdrop", () => {
    const handleClose = vi.fn();

    renderComponent({ onClose: handleClose });

    const backdrop = screen.getByTestId("backdrop");

    fireEvent.click(backdrop);

    expect(handleClose).toHaveBeenCalledOnce();
});

test("Confirm setting onConfirm", () => {
    const handleConfirm = vi.fn();

    renderComponent({ onConfirm: handleConfirm });

    const confirmButton = screen.getByText("Remove from cart");

    fireEvent.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledOnce();

});

test("onConfirm does NOT run automatically", () => {
    const handleConfirm = vi.fn();

    renderComponent({ onConfirm: handleConfirm });


    expect(handleConfirm).not.toHaveBeenCalled();
});


test("Modal got correct a11y", () => {
    
    renderComponent();

    const modal = screen.getByRole("dialog");

    expect(modal).toHaveAttribute("aria-label", "Remove from cart");
    expect(modal).toHaveAttribute("aria-modal", "true");
});