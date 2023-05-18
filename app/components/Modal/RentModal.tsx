'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
    FieldValues,
    SubmitHandler,
    set,
    useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import useRentModal from '@/app/hooks/useRentModal';
import Modal from './Modal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Map from '../Map';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/imageUpload';
import Input from '../inputs/input';
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGE = 3,
    DESCRIPTION = 4,
    PRICE = 5,

}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);
    console.log(step);
    const onBack = () => {
        setStep((value) => value - 1);

    }
    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        if (!location) {
            toast.error("Please select a location");
            return;
        }
        setIsLoading(true);

        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY)
                rentModal.onClose();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Submit';
        }
       
        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Back'
    }, [step]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            bedCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const location = watch('location');
    const category = watch('category');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const bedCount = watch('bedCount');
    const imageSrc = watch('imageSrc');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    let bodyContent = (
        <div className="flex flex-col gap-3">
            <Heading
                title="What kind of place are you listing?"
                subtitle="Choose a category that best describes your property"
            />
            <div className="
            grid grid-col-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto
            ">
                {

                    categories.map((item) => (
                        <div key={item.label}
                            className="
                        col-span-1
                        ">
                            <CategoryInput
                                onClick={(category) => setCustomValue(
                                    'category', category
                                )}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>


                    ))

                }

            </div>





        </div>

    )

    //  location content
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="modal-exception flex flex-col gap-8">
                <Heading
                    title="Where's your place located?"
                    subtitle="Guests will only get your exact address after they've booked a reservation"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => {

                        setCustomValue('location', value)
                    }
                    }

                />
                <Map />

            </div>

        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenitis do you have?"
                />
                <Counter
                    onChange={(value) => setCustomValue('guestCount', value)}
                    value={guestCount}
                    title="Guests"
                    subtitle="How many guests do you allow?"
                />
                <hr className="border-purple-500" />
                <Counter
                    onChange={(value) => setCustomValue('roomCount', value)}
                    value={roomCount}
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                />
                <hr className="border-purple-500" />
                <Counter
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                    value={bathroomCount}
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                />
                <hr className="border-purple-500" />
                <Counter
                    onChange={(value) => setCustomValue('bedCount', value)}
                    value={bedCount}
                    title="beds"
                    subtitle="How many bed do you have?"
                />
            </div>
        )
    }
    if (step === STEPS.IMAGE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                />
            </div>
        )
    }
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />

                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }


    return (
        <Modal
            disabled={isLoading}
            isOpen={rentModal.isOpened}
            title="Brucebnb your home!"
            actionLabel={actionLabel}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            onClose={rentModal.onClose}
            body={bodyContent}

        />
    );
}

export default RentModal;