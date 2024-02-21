"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { invoiceSchema } from '@/app/utils/formSchema'
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { createInvoice } from '@/app/utils/featuresApi'
import { useSession } from 'next-auth/react'
import Loader from '@/app/components/loader'
import AlertError from '@/app/components/alertError'
import { InvoiceState } from '@/types/interface'

const formSchema = invoiceSchema;

const FormInvoice = ({handleModal, setDataInvoice}: {handleModal: () => void, setDataInvoice: React.Dispatch<React.SetStateAction<InvoiceState | null>>} ) => {
    const {data: session} = useSession()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | boolean>(false)

    // definisi form  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invoice_name: "",
        },
    })

    // handle submit form tambah invoice
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)

        const data = {
            invoice_name: values.invoice_name,
            due_date: format(values.due, "yyyy-MM-dd"),
            payment_source: values.payment_source,
            payment_method: values.payment_method
        } as {
            invoice_name: string;
            due_date: string;
            payment_source: string;
            payment_method: string
        }
        
        const response = await createInvoice(data, session?.user.accessToken)
        
        if (response.status === 200) {
            handleModal()
            setDataInvoice(response.data.invoice);
        } else if (response.status === 422) {
            const errors = response.data.errors
            const keys = Object.keys(errors)
            const firstKey = keys[0]
            const message = errors[firstKey][0]
            

            setError(message)
        } else {
            setError("Terjadi kesalahan dengan sistem")
        }
        setIsLoading(false)
    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="invoice_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Invoice</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nama Invoice" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="due"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Tenggat Invoice</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pilih Tenggat</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="payment_source"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sumber Pembayaran</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sumber Pembayaran" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="gaji pns">Gaji PNS</SelectItem>
                                        <SelectItem value="gaji p3k">Gaji P3K</SelectItem>
                                        <SelectItem value="komite">Komite</SelectItem>
                                        <SelectItem value="TPP">TPP</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="payment_method"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Metode Pembayaran</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Metode Pembayaran" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="transfer">Transfer</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-end gap-3">
                        <Button type="button" className='text-white' onClick={handleModal}>Batal</Button>
                        <Button type="submit" className='text-white bg-green-400' disabled={isLoading}>
                            {isLoading ? <Loader /> : 'Tambah Invoice'}
                        </Button>
                    </div>
                </form>
            </Form>
            {error && <AlertError message={error.toString()} setError={setError} isShow={true} />}
        </div>
    )
}

export default FormInvoice