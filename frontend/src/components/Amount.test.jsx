import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { test, expect, vi } from "vitest";
import AddToCart from './Amount';


// Mock data
const renderComponent = (props = {}) => {
    return render(
        <AddToCart
            id="12"
            title="Test Item"
            stock={4}
            isOpen={true}
            onClose={() => {}}
            onConfirm={() => {}} 
            {...props} 
        />
    );
};


test("Modal renders when isOpen = true", () => {

    renderComponent();

    expect(screen.getByRole("dialog")).toBeInTheDocument();

});


test("Modal NOT renders if isOpen = false", () => {
    renderComponent({isOpen : false});

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

});

test("closes modal on X button click", () => {
    const handleClose = vi.fn();

    renderComponent({ onClose: handleClose });
    
    waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    const button = screen.getByText("X");

    fireEvent.click(button);

    expect(handleClose).toHaveBeenCalled();
});


test("closes modal when clicking on the backdrop", () => {
    const handleClose = vi.fn();

    renderComponent({ onClose: handleClose });

    const backdrop = screen.getByTestId("backdrop");

    fireEvent.click(backdrop);

    expect(handleClose).toHaveBeenCalledOnce();
});



test("title is rendered correctly", () => {
    
    renderComponent();

    const title = screen.getByRole("heading", {level: 2});

    expect(title).toHaveTextContent("Chosed: Test Item");

});

test("Modal got correct a11y", () => {
    
    renderComponent();

    const modal = screen.getByRole("dialog");

    expect(modal).toHaveAttribute("aria-label", "Add to cart");
    expect(modal).toHaveAttribute("aria-modal", "true");
});


test("Clicking `+` increaces amount by 1", () => {

    renderComponent();

    const button = screen.getByText("+");

    const presentedAmount = screen.getByText("1 item/s selected");

    fireEvent.click(button);

    expect(presentedAmount).toHaveTextContent("2 item/s selected");

});

test("Clicking `-` decreaces amount by 1", () => {
    renderComponent();
    
    const buttonInc = screen.getByText("+");
    
    const buttonDesc = screen.getByText("-");
    
    const presentedAmount = screen.getByText("1 item/s selected");
    
    // First need to click + 
    fireEvent.click(buttonInc);

    fireEvent.click(buttonDesc);

    expect(presentedAmount).toHaveTextContent("1 item/s selected");

});

test("Value cannot be more than stock", () => {

    renderComponent();

    const button = screen.getByText("+");

    const presentedAmount = screen.getByText("1 item/s selected");

    Array.from({ length: 8 }).forEach(() => fireEvent.click(button));

    expect(presentedAmount).toHaveTextContent("4 item/s selected");

});


test("Value cannot be less than 1", () => {
    renderComponent();
    
    const button = screen.getByText("-");
    
    const presentedAmount = screen.getByText("1 item/s selected");
    
    fireEvent.click(button);

    expect(presentedAmount).toHaveTextContent("1 item/s selected");

});


test("Adding to cart invokes onConfirm with correct values (id, selectedAmount)", () => {
    const handleConfirm = vi.fn();

    renderComponent({ onConfirm: handleConfirm });

    const button = screen.getByText("+");

    fireEvent.click(button);

    const confirmButton = screen.getByText("✔ Add to cart");

    fireEvent.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledWith("12", 2);

});


test("Confirm setting onConfirm", () => {
    const handleConfirm = vi.fn();

    renderComponent({ onConfirm: handleConfirm });

    const confirmButton = screen.getByText("✔ Add to cart");

    fireEvent.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledOnce();

});


test("onConfirm does NOT run automatically", () => {
    const handleConfirm = vi.fn();

    renderComponent({ onConfirm: handleConfirm });


    expect(handleConfirm).not.toHaveBeenCalled();
});
