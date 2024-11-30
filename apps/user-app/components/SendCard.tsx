"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransfer";

export function SendCard() {












    
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);  // For loading state
    const [error, setError] = useState("");         // For error messages
    const [success, setSuccess] = useState("");     // For success messages

    const handleTransfer = async () => {
        // Basic validation
        if (!number || !amount) {
            setError("Please fill in both fields.");
            return;
        }

        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }

        // Clear error and success messages
        setError("");
        setSuccess("");
        setLoading(true); // Set loading to true

        try {
            await p2pTransfer(number, numericAmount * 100);
            setSuccess("Transfer successful!");
            setNumber(""); // Clear input fields after success
            setAmount("");
        } catch (err) {
            setError("Transfer failed. Please try again.");
        } finally {
            setLoading(false); // Set loading to false when the transfer is complete
        }
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder={"Number"}
                            label="Number"
                            onChange={(value) => setNumber(value)} // No value prop
                        />
                        <TextInput
                            placeholder={"Amount"}
                            label="Amount"
                            onChange={(value) => setAmount(value)} // No value prop
                        />
                        
                        {/* Display error or success messages */}
                        {error && <div className="text-red-600 mt-2">{error}</div>}
                        {success && <div className="text-green-600 mt-2">{success}</div>}

                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleTransfer} disabled={loading}>
                                {loading ? "Processing..." : "Send"}
                            </Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}
