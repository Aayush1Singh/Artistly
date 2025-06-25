// This file implements a multi-section onboarding form for artists joining Artistly.
// It uses React hooks and react-hook-form with Zod validation for step-by-step form state and validation.
// The form guides users through personal info, skills & pricing, and location, with a summary before submission.
// UI is built with fully independent, reusable components, and the progress indicator helps users track their progress.

"use client";
import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Upload, CheckCircle } from "lucide-react";
import { z, ZodObject } from "zod";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Mandarin",
  "Japanese",
];
const categories = [
  "Singer",
  "Dancer",
  "Speaker",
  "DJ",
  "Musician",
  "Comedian",
  "Magician",
  "Band",
];

const feeRanges = [
  "$100-300",
  "$300-500",
  "$500-1000",
  "$1000-2500",
  "$2500-5000",
  "$5000+",
];
const schema = z.object({
  basic: z.object({
    fullName: z.string(),
    bio: z.string(),
    categories: z.string().array(),
  }),
  feeSkill: z.object({
    fee: z.string(),
    languages: z.string().array(),
  }),
  location: z.object({
    location: z.string(),
  }),
});
interface MultiStepFormProps {
  /** The schema to validate the form */
  schema: typeof schema; // ✅ Now correctly refers to the actual schema type;
  /* The useForm hook return object */
  methods: UseFormReturn<FormValues>;
  /* The steps of the form, where the name of the step matches the one in the schema */
  steps: { name: string; children: ReactNode }[];
  /* The controls for moving forward and backwards */
  controls?: ReactNode;
  /* The function to call when the form is submitted */
  onSubmit: (data: FormValues) => void;
  currentStep: number;
  setCurrentStep: (state: number) => void;
}
interface MultiStepFormRef {
  handleNext: () => void;
  handleBack: () => void;
}

const MultiStepForm = forwardRef<MultiStepFormRef, MultiStepFormProps>(
  (
    { schema, methods, steps, controls, onSubmit, currentStep, setCurrentStep },
    ref
  ) => {
    const schemaKeys: string[] = schema.keyof()._def.values;
    const numberOfFields = schemaKeys.length + 1;
    if (numberOfFields !== steps.length)
      throw new Error("Amount of steps and fields in schema do not match");

    const isLastStep = currentStep === steps.length - 1;

    const handleBack = () => {
      if (currentStep > 0) {
        const newStep = currentStep - 1;
        setCurrentStep(newStep);
      }
    };
    function onError(data: unknown) {
      console.log(data);
    }
    const handleNext = () => {
      if (!isLastStep) {
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
      } else {
        // handleSubmit validates the data according to the schema, meaning if it is invalid it won't reach the onSubmit function or in our case, log in the console
        methods.handleSubmit(onSubmit, onError)();
      }
    };

    useImperativeHandle(ref, () => {
      return {
        handleNext,
        handleBack,
      };
    });
    MultiStepForm.displayName = "MultiStepForm";

    return (
      <div className="w-full">
        {steps.map(
          (step, index) =>
            index === currentStep && <div key={index}>{step.children}</div>
        )}
        <div className="flex flex-row mt-4 w-full justify-between">
          {Array.isArray(controls) &&
            controls.map((control, index) => <div key={index}>{control}</div>)}
        </div>
      </div>
    );
  }
);

type FormValues = z.infer<typeof schema>;
function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const multiStepFormRef = useRef<MultiStepFormRef>(null);

  const steps = [
    {
      name: "personal",
      children: (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...methods.register("basic.fullName")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about your artistic background and experience..."
              rows={4}
              {...methods.register("basic.bio")}
            />
          </div>
          <div className="space-y-2">
            <Controller
              name="basic.categories"
              control={methods.control}
              rules={{ required: "Please pick at least one category" }}
              render={({ field: { value = [], onChange }, fieldState }) => (
                <div className="space-y-2">
                  <fieldset>
                    <legend>Select one or more categories:</legend>
                    <div className="flex flex-col space-y-2">
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center">
                          <Checkbox
                            id={cat}
                            checked={value.includes(cat)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onChange([...value, cat]);
                              } else {
                                onChange(value.filter((v) => v !== cat));
                              }
                            }}
                          />
                          <Label htmlFor={cat} className="ml-2">
                            {cat}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                  {fieldState.error && (
                    <p className="text-red-600 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </>
      ),
    },
    {
      name: "address",
      children: (
        <>
          <div className="space-y-2">
            <Controller
              name="feeSkill.languages"
              control={methods.control}
              rules={{ required: "Please select at least one language" }}
              render={({ field: { value = [], onChange }, fieldState }) => (
                <div className="space-y-2">
                  <fieldset>
                    <legend>Select one or more Languages:</legend>
                    <div className="flex flex-col space-y-2">
                      {languages.map((lang) => (
                        <div key={lang} className="flex items-center">
                          <Checkbox
                            id={lang}
                            checked={value.includes(lang)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onChange([...value, lang]);
                              } else {
                                onChange(value.filter((v) => v !== lang));
                              }
                            }}
                          />
                          <Label htmlFor={lang} className="ml-2">
                            {lang}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                  {fieldState.error && (
                    <p className="text-red-600 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label>Fee Range *</Label>
            <Controller
              name="feeSkill.fee"
              control={methods.control}
              rules={{ required: "Please select a fee range" }}
              render={({ field, fieldState }) => (
                <>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your typical fee range" />
                    </SelectTrigger>
                    <SelectContent>
                      {feeRanges.map((range) => (
                        <SelectItem
                          key={range}
                          value={range}
                          className="!bg-white !hover:bg-amber-200"
                        >
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </>
      ),
    },
    {
      name: "",
      children: (
        <>
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              {...methods.register("location.location")}
              id="location"
              placeholder="City, State (e.g., New York, NY)"
            />
          </div>
        </>
      ),
    },
    {
      name: "final",
      children: (
        <div className="bg-lime-green/10 border border-lime-green/20 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-forest-green">
            Application Summary
          </h3>
          <div className="text-sm space-y-1">
            <p>
              <strong>Name:</strong> {methods?.getValues("basic.fullName")}
            </p>
            <p>
              <strong>Categories:</strong>{" "}
              {methods.getValues("basic.categories")?.join(",")}
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {methods?.getValues("feeSkill.languages")?.join(",")}
            </p>
            <p>
              <strong>Fee Range:</strong> {methods?.getValues("feeSkill.fee")}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {methods.getValues("location.location")}
            </p>
          </div>
        </div>
      ),
    },
  ];

  const controls = [
    <Button
      key="1"
      variant="outline"
      onClick={() => multiStepFormRef.current?.handleBack()}
      // disabled={currentStep === 1}
      className="border-forest-green text-forest-green hover:bg-forest-green/10"
    >
      Previous
    </Button>,
    <Button
      key="4"
      onClick={() => multiStepFormRef.current?.handleNext()}
      // disabled={!isStepValid()}
      className="bg-gradient-to-r from-forest-green to-bright-green hover:from-forest-green/90 hover:to-bright-green/90"
    >
      {currentStep == 3 ? "Submit Application" : "Next"}
    </Button>,
  ];

  const handleSubmit = async (data: FormValues) => {
    toast("Form Submitted. See console.log()");
    await axios.post("/submitonboard", {
      data,
    });
    console.log(data);
  };

  return (
    <>
      {" "}
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <div className="bg-gradient-to-r from-forest-green to-bright-green text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Join Artistly
            </h1>
            <p className="text-xl text-lime-green/80">
              Create your artist profile and start receiving booking requests
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {[0, 1, 2].map((step) => (
                <div
                  key={step}
                  className={`flex items-center space-x-2 ${
                    step <= currentStep ? "text-forest-green" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      step < currentStep
                        ? "bg-forest-green border-forest-green text-white"
                        : step === currentStep
                        ? "border-forest-green text-forest-green"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step
                    )}
                  </div>
                  <span className="hidden sm:block font-medium">
                    {step === 1 && "Basic Info"}
                    {step === 2 && "Skills & Pricing"}
                    {step === 3 && "Location & Photo"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {currentStep === 1 && "Tell Us About Yourself"}
                {currentStep === 2 && "Your Skills & Pricing"}
                {currentStep === 3 && "Final Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <MultiStepForm
                schema={schema}
                methods={methods}
                steps={steps}
                controls={controls}
                onSubmit={handleSubmit}
                ref={multiStepFormRef}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
